require('dotenv').config();
const http = require('http');
const app = require('./index');
const { connectToDatabase } = require('./src/db');

async function startServer() {
  try {
    await connectToDatabase(process.env.DB_NAME);
    console.log('DB NAME:', process.env.DB_NAME);
    const server = http.createServer(app);
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
}

startServer();