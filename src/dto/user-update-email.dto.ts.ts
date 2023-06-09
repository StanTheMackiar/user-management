import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import { passwordRegEx } from '../config/const';
import { emailDTOShema, passwordDTOShema } from './dto-types';


const UpdateEmailDTOSChema = Type.Object({
  email: emailDTOShema,
  password: passwordDTOShema,
}, {
  additionalProperties: true,
  errorMessage: {
    additionalProperties: 'El formato del objeto es inválido'
  }
})

const ajv = new Ajv({ allErrors: true });
ajv.addFormat('password', passwordRegEx);
addFormats(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(UpdateEmailDTOSChema);

const userUpdateEmailDTO = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = validateSchema(req.body);


  if(!isDTOValid) {
    return res
      .status(400)
      .json({errors: validateSchema.errors!.map(error => error.message)});
  }

  next();
}

export default userUpdateEmailDTO;