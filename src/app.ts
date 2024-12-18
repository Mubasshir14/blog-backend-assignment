import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Running 🏃‍♂️🏃‍♂️🏃🏃',
  });
};

app.get('/', getAController);

export default app;
