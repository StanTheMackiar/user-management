import { Request, Response } from "express";
import UserModel from "../../schemas/user.schema";
import bcrypt from 'bcrypt';
import { SALT } from "../../lib";

type DataRes =
| { error: string }
| { message: string }

export const userUpdatePasswordController = async(req: Request<{}, {}, { id: string, oldPassword: string, newPassword: string }>, res: Response<DataRes>) => {

  const { id, oldPassword, newPassword } = req.body;

  const user = await UserModel.findById(id).select('password').exec();
  if(!user) 
    return res
      .status(401)
      .json({ error: 'Usuario no autorizado' });
  
  if(oldPassword === newPassword)
    return res
      .status(400)
      .json({ error: 'Las contraseñas no pueden ser las mismas' })

  const matchPassword = await bcrypt.compare(oldPassword, user.password!);
  if(!matchPassword)
    return res
      .status(401)
      .json({ error: 'Credenciales incorrectas' });

  user.password = await bcrypt.hash(newPassword, SALT),
  await user.save();

  return res.send({ message: 'Contraseña actualizada' });
};