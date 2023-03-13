import { Schema, model, Model } from 'mongoose';
import { User } from '../interfaces/User';

const userSchema = new Schema({
  _id: { type: String, _id: false },
  name: { type: String, required: true, minlength: 2, maxlength: 20 },
  surname: { type: String, required: true, minlength: 4, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  fullName: { type: String },
}, {
  timestamps: true,
});

export const UserModel: Model<User> = model<User>("User", userSchema);

export default UserModel;