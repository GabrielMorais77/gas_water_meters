import bodyParser from 'body-parser';
import express from 'express';
import readingsRouter from './routes/index';
import uploadRouter from './routes/upload';

const app = express();

app.use(bodyParser.json());
app.use('/api', uploadRouter);
app.use('/api', readingsRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
