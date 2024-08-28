import express from 'express';
import { config } from './config';
import routes from './routes';



const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}`);
});