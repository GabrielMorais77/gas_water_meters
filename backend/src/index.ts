import express from 'express';
import { config } from './config';
import { sequelize } from './config/database';

// Inicialize o aplicativo Express
const app = express();
app.use(express.json());

// Conecte-se ao banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });

// Inicie o servidor
app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});
