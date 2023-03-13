import { Router } from 'express'
import { userLoginDTO, userRegisterDTO, userUnregisterDTO, userUpdateDataDTO, userUpdateEmailDTO, userUpdatePasswordDTO } from '../dto';

const userRouter = Router();

userRouter.post('/register', userRegisterDTO, (req, res) => {
  res.send();
});
userRouter.post('/login', userLoginDTO, (req, res) => {
  res.send();
});
userRouter.get('/profile', );
userRouter.patch('/update-data', userUpdateDataDTO, (req, res) => {
  res.send();
});
userRouter.patch('/update-email', userUpdateEmailDTO, (req, res) => {
  res.send();
});
userRouter.patch('/update-password', userUpdatePasswordDTO, (req, res) => {
  res.send();
});
userRouter.delete('/unregister', userUnregisterDTO, (req, res) => {
  res.send();
});


export default userRouter;