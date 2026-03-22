import express from 'express';
import type { Request, Response, NextFunction } from 'express';

const app = express();

app.get('/api/v1', (req: Request, res: Response, next: NextFunction) => {
  res.json({message: 'This api says hello'});
});

export default app;
