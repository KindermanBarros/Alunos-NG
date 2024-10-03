import { Router, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controller/userController";

const router = Router();

router.get("/usuarios", (req: Request, res: Response) => getAllUsers(req, res));
router.post("/usuarios", (req: Request, res: Response) => createUser(req, res));
router.put("/usuarios/:id", (req: Request, res: Response) =>
  updateUser(req, res)
);
router.delete("/usuarios/:id", (req: Request, res: Response) =>
  deleteUser(req, res)
);

export default router;
