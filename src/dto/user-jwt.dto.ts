import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

type Res = { message: string }


export const userJWTDTO = async(req: Request, res: Response<Res>, next: NextFunction) => {
  const { authorization } = req.headers;

  if(!authorization) return res.status(401).json({ message: 'No hay autorización' })

  const jwt = authorization.split(' ')[1];

  if(!jwt) return res.status(401).json({ message: 'No hay JWT' })

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      jwt, 
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    req.body.id = payload.id as string;
    next();
  } catch (error) {
    console.log({error})
    return res.status(401).json({ message: 'Usuario no autorizado' })
  }
}