import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import { NextFunction, Request, Response } from 'express';
import { passwordRegEx } from '../config/const';
import { emailDTOShema, idDTOShema, nameDTOShema, passwordDTOShema, surnameDTOShema } from './dto-types';


const RegisterDTOSChema = Type.Object({
  _id: idDTOShema,
  name: nameDTOShema,
  surname: surnameDTOShema,
  email: emailDTOShema,
  password: passwordDTOShema,
}, {
  additionalProperties: false,
  errorMessage: {
    additionalProperties: 'El formato del objeto es inválido'
  }
})

const ajv = new Ajv({ allErrors: true });
ajv.addFormat('password', passwordRegEx);
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSChema);


const userRegisterDTO = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = validateSchema(req.body);


  if(!isDTOValid) {
    return res
      .status(400)
      .json({errors: validateSchema.errors!.map(error => error.message)});
  }

  next();
}

export default userRegisterDTO;