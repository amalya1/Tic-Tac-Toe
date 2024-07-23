import './app';
import http from 'http';
import app from './app';

const server = http.createServer(app);

const PORT = 3000; // Порт для сервера
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import './socketServer';

export { server };
