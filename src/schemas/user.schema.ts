import mongoose, { Schema, model, Model } from 'mongoose';
import { User } from '../interfaces/User';

const userSchema = new Schema<User>({
  name: { type: String, required: true, minlength: 2, maxlength: 20 },
  surname: { type: String, required: true, minlength: 4, maxlength: 50 },
  email: { type: String, required: true },
  password: {type: String, required: true },
  fullName: { type: String },
}, {
  timestamps: true,
});

const userModel: Model<User> = mongoose.models.User || model("User", userSchema);

export default userModel;