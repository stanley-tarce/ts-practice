import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

const SALT_WORK_FACTOR = config.get<number>('SALT_WORK_FACTOR');

export interface UserDocument extends mongoose.Document {
  email: string,
  name: string,
  password: string,
  created_at: Date,
  updated_at: Date,
  comparePassword(candidatePassword:string):Promise<boolean>
}

export interface HookNextFunction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error?: Error): any
}

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  password: {type:String, required: true}
},{
  timestamps:true
});

userSchema.pre('save', async function (next: HookNextFunction) {
  let user = this as any as UserDocument;
  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function(
  candidatePassword: string
  ):Promise<boolean> {
  const user = this as UserDocument;
  try {
    return bcrypt.compare(candidatePassword,user.password);
  } catch (e) {
    return false;
  }
}

const UserModel = mongoose.model('User',userSchema);

export default UserModel