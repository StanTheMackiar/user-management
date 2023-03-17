import { Request, Response } from "express";
import UserModel from "../../schemas/user.schema";
import bcrypt from 'bcrypt';
import { SALT } from "../../lib";

type DataRes =
| { error: string }
| { message: string }

export const userUnRegisterController = async(req: Request<{}, {}, { id: string, password: string }>, res: Response<DataRes>) => {

  const { id, password } = req.body;

  const user = await UserModel.findById(id).select('password').exec();
  if(!user) 
    return res
      .status(401)
      .json({ error: 'Usuario no autorizado' });


  const matchPassword = await bcrypt.compare(password, user.password!);
  if(!matchPassword)
    return res
      .status(401)
      .json({ error: 'Credenciales incorrectas' });

  await UserModel.deleteOne({ _id: id });

  return res.send({ message: 'Usuario eliminado' });
};