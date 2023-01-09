import { ObjectId } from 'mongodb';
import { Request, Response } from 'express';
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { signupSchema } from '@auth/schemes/signup';
import { IAuthDocument, ISignUpData } from '@auth/interfaces/auth.interface';
import { authService } from '@services/db/auth.service';
import { BadRequestError } from '@global/helpers/error-handler';
import { Helpers } from '@global/helpers/helpers';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@global/helpers/cloudinary-upload';
import HTTP_STATUS from 'http-status-codes';
import { IUserDocument } from '@root/features/user/interfaces/user.interface';
import { UserCache } from '@services/redis/user.cache';
import { omit } from 'lodash';
import { authQueue } from '@services/queues/auth.queue';
import { userQueue } from '@services/queues/user.queue';
import JWT from 'jsonwebtoken';
import { config } from '@root/config';
const userCache: UserCache = new UserCache();

export class SignUp {
  @joiValidation(signupSchema)
  public async create(req: Request, res: Response): Promise<void> {
    const { username, email, password, avatarColor, avatarImage } = req.body;
    // console.log('BODY', req.body);
    const userIsExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);
    if (userIsExist) {
      throw new BadRequestError('invalid Credentials');
    }
    //create objectID which allow that _ID generated by mongoDb to be saved in DB and Redis
    const authObjectId: ObjectId = new ObjectId();
    const userObjectId: ObjectId = new ObjectId();
    const uId = `${Helpers.generateRandomInteger(12)}`;
    const authData: IAuthDocument = SignUp.prototype.signupData({
      _id: authObjectId,
      uId,
      username,
      password,
      email,
      avatarColor
    });

    //checker any upload error by checking public id
    const result: UploadApiResponse = (await uploads(avatarImage, `${userObjectId}`, true, true)) as UploadApiResponse;
    if (!result?.public_id) {
      throw new BadRequestError('File upload: invalid credentials, try again');
    }

    // add to redisc cache
    const userDataForCache: IUserDocument = SignUp.prototype.userData(authData, userObjectId);
    userDataForCache.profilePicture = `https://res.cloudinary.com/dqn9uwp3c/image/upload/v${result.version}/{userObjectId}`;
    await userCache.saveUserToCache(`${userObjectId}`, uId, userDataForCache);

    // add to Database
    // set data for the job message queue
    omit(userDataForCache, ['uId', 'username', 'email', 'avatarColor', 'password']);
    // const userResult = omit(userDataForCache, ['uId','username', 'email','avatarColor', 'password']);
    authQueue.addAuthUserJob('addAuthUserToDB', { value: authData });
    userQueue.addUserJob('addUserToDB', { value: userDataForCache });
    // userQueue.addUserJob('addUserToDB', {value : userResult });

    //adding data to session
    const userJwt: string = SignUp.prototype.signToken(authData, userObjectId);
    req.session = { jwt: userJwt };

    res.status(HTTP_STATUS.CREATED).json({ message: 'user created!!', authData, user: userDataForCache, token: userJwt });
  }
  private signToken(data: IAuthDocument, userObjectId: ObjectId): string {
    return JWT.sign(
      {
        userId: userObjectId,
        uId: data.uId,
        email: data.email,
        username: data.username,
        avatarColor: data.avatarColor
      },
      config.JWT_TOKEN!
    );
  }
  private signupData(data: ISignUpData): IAuthDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id,
      uId,
      password,
      username: Helpers.firstLetterUppercase(username),
      email: Helpers.lowerCase(email),
      avatarColor,
      createdAt: new Date()
    } as IAuthDocument;
  }

  private userData(data: IAuthDocument, userObjectId: ObjectId): IUserDocument {
    const { _id, username, email, uId, password, avatarColor } = data;
    return {
      _id: userObjectId,
      authId: _id,
      uId,
      username: Helpers.firstLetterUppercase(username),
      email,
      password,
      avatarColor,
      postsCount: 0,
      work: '',
      school: '',
      quote: '',
      location: '',
      bgImageVersion: '',
      bgImageId: '',
      profilePicture: '',
      blocked: [],
      blockedBy: [],
      followersCount: 0,
      followingCount: 0,
      notifications: {
        messages: true,
        reactions: true,
        comments: true,
        follows: true
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
      }
    } as unknown as IUserDocument;
  }
}
