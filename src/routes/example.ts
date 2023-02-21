import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.send('This is an example route.');
});

router.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.json(body);
});

export default router;

