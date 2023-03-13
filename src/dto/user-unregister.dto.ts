import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors'
import { NextFunction, Request, Response } from 'express';
import { passwordRegEx } from '../config/const';
import { passwordDTOShema } from './dto-types';


const UnRegisterDTOSChema = Type.Object({
  password: passwordDTOShema,
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'El formato del objeto es inválido'
  }
})

const ajv = new Ajv({ allErrors: true });
ajv.addFormat('password', passwordRegEx);
addErrors(ajv);

const validateSchema = ajv.compile(UnRegisterDTOSChema);

const userUnregisterDTO = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = validateSchema(req.body);


  if(!isDTOValid) {
    return res
      .status(400)
      .json({errors: validateSchema.errors!.map(error => error.message)});
  }

  next();
}

export default userUnregisterDTO;