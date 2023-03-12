import './config/env';
import { connectDB, httpServer } from './config';

 const bootstrap = async() => {

    await connectDB(process.env.MONGODB_URL);

    httpServer.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando el puerto ${process.env.PORT}`)
    });
 }  

 bootstrap();