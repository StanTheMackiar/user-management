import './config/env'
import httpServer from './config/http';

 const bootstrap = () => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando el puerto ${process.env.PORT}`)
    });
 }  

 bootstrap();