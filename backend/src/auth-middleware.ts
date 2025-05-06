import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { IUser } from './models/user';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        message: 'Missing Authorization token!',
      });

      return next('router');
    }

    const [scheme, token] = req.headers.authorization.split(' ');

    if (scheme !== 'Bearer') {
      res.status(401).json({
        message: 'Invalid Authorization token!',
      });

      return next('router');
    }

    const user = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
    req.user = user;

    next();
  } catch (err) {
    const jwtError = err as VerifyErrors;

    if (jwtError.name === 'TokenExpiredError') {
      // Handle expired token
      console.error('Token has expired');
      res.status(401).json({
        message: 'Token has expired',
      });
    } else if (jwtError.name === 'JsonWebTokenError') {
      // Handle invalid token
      console.error('Token is invalid');
      res.status(401).json({
        message: 'Token is invalid',
      });
    } else {
      // Handle other errors
      console.error('Error verifying token:', jwtError.message);
      res.status(401).json({
        message: jwtError.message,
      });
    }

    next(err);
  }
};
