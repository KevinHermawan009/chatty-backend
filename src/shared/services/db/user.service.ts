import { IUserDocument } from '@root/features/user/interfaces/user.interface';
import { UserModel } from '@root/features/user/models/user.schema';
import mongoose from 'mongoose';

class UserService {
  public async addUserData(data: IUserDocument): Promise<void> {
    await UserModel.create(data);
  }

  public async getUserById(userId: string): Promise<IUserDocument> {
    const users: IUserDocument[] = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'Auth', localField: 'authId', foreignField: '_id', as: 'authId' } }, //return id as array
      { $unwind: '$authId' }, //return it as object so we can access it
      { $project: this.aggregateProject() }
    ]);
    console.log('getUserById', users);
    return users[0];
  }
  public async getUserByAuthId(authId: string): Promise<IUserDocument> {
    console.log('authId', authId);

    const users: IUserDocument[] = await UserModel.aggregate([
      {
        $match: {
          // authId: new mongoose.Types.ObjectId(authId)
          authId: new mongoose.Types.ObjectId(authId)
        }
      },
      //Lookup -> goto Auth Collection -> localField look up to authId from IUserDocument -> and field what we looking for is _id -> return it as authId
      {
        $lookup: {
          from: 'Auth',
          localField: 'authId',
          foreignField: '_id',
          as: 'authId'
        }
      },
      { $unwind: '$authId' }, //return it as object
      { $project: this.aggregateProject() }
    ]);
    console.log('users', users);
    return users[0];
  }

  private aggregateProject() {
    return {
      _id: 1, //set to 0 for exclueded and set to 1 to return it
      username: '$authId.username', //can be access from unwind operator
      uId: '$authId.uId',
      email: '$authId.email',
      avatarColor: '$authId.avatarColor',
      createdAt: '$authId.createdAt',
      postsCount: 1,
      work: 1,
      school: 1,
      quote: 1,
      location: 1,
      blocked: 1,
      blockedBy: 1,
      followersCount: 1,
      followingCount: 1,
      notifications: 1,
      social: 1,
      bgImageVersion: 1,
      bgImageId: 1,
      profilePicture: 1
    };
  }
}

export const userService: UserService = new UserService();
