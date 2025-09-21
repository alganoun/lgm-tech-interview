import { NextFunction, Request, Response } from 'express';

export function HandleResponse(controller: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await controller(req, res);
      return res.status(200).json(response);
    } catch (e) {
      return next(e);
    }
  };
}
