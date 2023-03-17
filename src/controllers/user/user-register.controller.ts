import { Request, Response } from "express";
import { User } from "../../interfaces";
import UserModel from "../../schemas/user.schema";
import bcrypt from 'bcrypt';
import { SALT } from "../../lib";

interface BodyRequest extends Request {
  body: User
}

type DataRes =
| { error: string }
| User

export const userRegisterController = async(req: Request<{}, {}, User>, res: Response<DataRes>) => {
  const { _id, name, surname, email, password } = req.body;

  const existingUserById = await UserModel.findById(_id).exec();
  if(existingUserById) return res.status(409).json({ error: 'Ya existe un usuario con ese id' });

  const existingUserByEmail = await UserModel.findOne({ email }).exec();
  if(existingUserByEmail) return res.status(409).json({ error: 'Ya existe un usuario con ese email' });

  const hashedPassword = await bcrypt.hash(password!, SALT);

  const user = new UserModel({
    _id, 
    name, 
    surname, 
    fullName: `${name} ${surname}`,
    email, 
    password: hashedPassword,
  })

  await user.save();

  return res.json(user)
}