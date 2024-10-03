import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/usuarios', (req: Request, res: Response) => userController.getUsers(req, res));
router.post('/usuarios', (req: Request, res: Response) => userController.createUser(req, res));
router.put('/usuarios/:id', (req: Request, res: Response) => userController.updateUser(req, res));
router.delete('/usuarios/:id', (req: Request, res: Response) => userController.deleteUser(req, res));

export default router;