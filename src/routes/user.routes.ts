import { Router } from 'express'
import { userJWTDTO, userLoginDTO, userRegisterDTO, userUnregisterDTO, userUpdateDataDTO, userUpdateEmailDTO, userUpdatePasswordDTO } from '../dto';
import { userLoginController, userRegisterController, userProfileController, userUpdateDataController, userUpdateEmailController, userUpdatePasswordController, userUnRegisterController } from '../controllers/user';

const userRouter = Router();

userRouter.post('/register', userRegisterDTO, userRegisterController);
userRouter.post('/login', userLoginDTO, userLoginController, );
userRouter.get('/profile', userJWTDTO, userProfileController);
userRouter.patch('/update-data', userJWTDTO, userUpdateDataDTO, userUpdateDataController, );
userRouter.patch('/update-email', userJWTDTO, userUpdateEmailDTO, userUpdateEmailController, );
userRouter.patch('/update-password', userJWTDTO, userUpdatePasswordDTO, userUpdatePasswordController, );
userRouter.delete('/unregister', userJWTDTO, userUnregisterDTO, userUnRegisterController, );


export default userRouter;