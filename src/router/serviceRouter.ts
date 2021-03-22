import { Request, Response, NextFunction } from 'express';
import express from 'express';
import path from 'path';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
    const indexFile = path.resolve(__dirname, '../public/index.html');
    return res.sendFile(indexFile);
});

export default router;