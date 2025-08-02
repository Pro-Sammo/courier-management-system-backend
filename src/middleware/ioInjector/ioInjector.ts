import { Request, Response, NextFunction } from 'express';
import { io } from '../../app/socket';

export const ioInjector = (req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  next();
};