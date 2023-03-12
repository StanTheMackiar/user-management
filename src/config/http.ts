import { createServer } from 'http';
import expressApp from './express';

// Esto es para separar express del servidor http
const httpServer = createServer(expressApp);

export default httpServer;