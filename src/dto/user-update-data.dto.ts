import { Type } from '@sinclair/typebox';
import Ajv from 'ajv';
import addErrors from 'ajv-errors'
import { NextFunction, Request, Response } from 'express';
import { nameDTOShema, surnameDTOShema } from './dto-types';



const UpdateDataDTOSChema = Type.Object({
  name: nameDTOShema,
  surname: surnameDTOShema,
}, {
  additionalProperties: true,
  errorMessage: {
    additionalProperties: 'El formato del objeto es inválido'
  }
})

const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSChema);

const userUpdateDataDTO = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  const isDTOValid = validateSchema(req.body);

  if(!isDTOValid) {
    return res
      .status(400)
      .json({errors: validateSchema.errors!.map(error => error.message)});
  }

  next();
}

export default userUpdateDataDTO;