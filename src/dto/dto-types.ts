import { Type } from "@sinclair/typebox";

export const idDTOShema = Type.String({
  format: 'uuid', 
  errorMessage: {
    type: 'Tipo no válido, debe ser string',
    format: 'Formato inválido, debe ser un uuid4',
  }
});
export const nameDTOShema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    type: 'Tipo no válido, debe ser string',
    format: 'Formato inválido, debe tener entre 2 a 20 carácteres',
  }
});
export const surnameDTOShema = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: {
    type: 'Tipo no válido, debe ser string',
    format: 'Formato inválido, debe tener entre 4 a 50 carácteres',
  }
});
export const emailDTOShema = Type.String({
  format: 'email',
  errorMessage: {
    type: 'Tipo no válido, debe ser string',
    format: 'Formato de email inválido',
  }
});
export const passwordDTOShema = Type.String({
  format: 'password',
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    type: 'Tipo no válido, debe ser string',
    format: 'Formato de password inválido, debe contener una múscula, una minúscula y un número',
    minLength: 'Password debe tener mínimo 10 carácteres',
    maxLength: 'Password debe tener máximo 20 carácteres',
  }
});