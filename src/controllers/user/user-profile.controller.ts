import { Request, Response } from "express";
import { User } from "../../interfaces";
import UserModel from "../../schemas/user.schema";

type DataRes =
| { error: string }
| User

export const userProfileController = async(req: Request<{}, {}, { id: string }>, res: Response<DataRes>) => {
  const { id } = req.body;
  console.log({id})

  const existingUserById = await UserModel.findById(id).exec();
  if(!existingUserById) 
    return res
      .status(401)
      .json({ error: 'Usuario no autorizado' });
  
  const { _id, name, surname, email, fullName = '' } = existingUserById;

  return res.send({ _id, name, surname, email, fullName });

};