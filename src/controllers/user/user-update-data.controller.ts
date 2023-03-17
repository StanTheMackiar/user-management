import { Request, Response } from "express";
import { User } from "../../interfaces";
import UserModel from "../../schemas/user.schema";

type DataRes =
| { error: string }
| User

export const userUpdateDataController = async(req: Request<{}, {}, { id: string, name: string, surname: string }>, res: Response<DataRes>) => {

  const { id, name, surname } = req.body;
  console.log({id})
  console.log('f')
  const user = await UserModel.findById(id).select('-password -createdAt -updatedAt -__v').exec();
  if(!user) 
    return res
      .status(401)
      .json({ error: 'Usuario no autorizado' });
  
  user.name = name;
  user.surname = surname;
  await user.save();

  return res.send(user);
};