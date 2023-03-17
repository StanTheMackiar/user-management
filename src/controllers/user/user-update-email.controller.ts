import { Request, Response } from "express";
import UserModel from "../../schemas/user.schema";
import bcrypt from 'bcrypt';

type DataRes =
| { error: string }
| { email: string }

export const userUpdateEmailController = async(req: Request<{}, {}, { id: string, email: string, password: string }>, res: Response<DataRes>) => {

  const { id, email, password } = req.body;

  const user = await UserModel.findById(id).select('password').exec();
  if(!user) 
    return res
      .status(401)
      .json({ error: 'Usuario no autorizado' });
  
  const matchPassword = await bcrypt.compare(password, user.password!)
  if(!matchPassword)
    return res
      .status(401)
      .json({ error: 'Credenciales incorrectas' });

  user.email = email,
  await user.save();

  return res.send({ email: user.email });
};