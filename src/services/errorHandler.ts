import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res.status(505).json({status:false,message:err.message});
};