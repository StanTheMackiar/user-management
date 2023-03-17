import { Request, Response } from "express";
import { User } from "../../interfaces";
import UserModel from "../../schemas/user.schema";
import bcrypt from 'bcrypt';
import { SignJWT  } from 'jose';

interface BodyRequest extends Request {
  body: {
    email: string,
    password: string,
  }
}

type DataRes =
| { error: string }
| { jwt: string }

export const userLoginController = async(req: BodyRequest, res: Response<DataRes>) => {
  const { email, password } = req.body;

  const existingUserByEmail = await UserModel.findOne({ email }).exec();
  if(!existingUserByEmail) 
    return res
      .status(401)
      .json({ error: 'Credenciales incorrectas' });

    const matchPassword = await bcrypt.compare(password, existingUserByEmail.password!)
    if(!matchPassword)
      return res
        .status(401)
        .json({ error: 'Credenciales incorrectas' })

    const jwtConstructor = new SignJWT({
      id: existingUserByEmail._id,
    });

    const enconder = new TextEncoder();
    const jwt = await jwtConstructor.setProtectedHeader({ 
      alg: 'HS256',
      typ: 'JWT', 
    }).setIssuedAt().setExpirationTime('7d').sign(enconder.encode(process.env.JWT_PRIVATE_KEY));

    return res
      .status(201)
      .json({ jwt })
}