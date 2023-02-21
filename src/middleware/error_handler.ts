import { Request, Response, NextFunction } from 'express';


function errorHandler(err: Error,
                      _req: Request,
                      res: Response,
                      _next: NextFunction)
{
  console.error(err);

  res.status(500).json({'status': 'error', 'data': 'Internal Server Error'});
}

export default errorHandler;
