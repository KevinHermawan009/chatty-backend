import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { model, Model, Schema } from 'mongoose';

const SALT_ROUND = 10; //how many hashed our password

const authSchema: Schema = new Schema(
  {
    username: { type: String },
    uId: { type: String },
    email: { type: String },
    password: { type: String },
    avatarColor: { type: String },
    createdAt: { type: Date, default: Date.now },
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
  },
  {
    //transform property
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    } //this method make sure waktu request ke DATABASE dy gk akan balikin password
  }
);

authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
  this.password = hashedPassword;
  next();
}); //before password saved it need to be hash the password

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> { //for login compare password
  const hashedPassword: string = (this as unknown as IAuthDocument).password!; //this here is any object
  return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');

// in here we defined the modelthen pass IAuthDocument  'Model<IAuthDocument> = model<IAuthDocument>'
//set the name '('Auth', authSchema, 'Auth')'
//pass the schemas '(authSchema)'
//set the model again at the last '('Auth')'

export { AuthModel };
