import { Router, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserImage,
  updateUser,
  uploadImage,
  getUser,
  getUserById,
} from "../controller/userController";
import upload from "../utils/uploadHandler";

const router = Router();

router.get("/usuarios", (req: Request, res: Response) => getAllUsers(req, res));
router.get("/usuarios/:id", (req: Request, res: Response) => getUser(req, res));
router.post("/usuarios", (req: Request, res: Response) => createUser(req, res));
router.put("/usuarios/:id", (req: Request, res: Response) =>
  updateUser(req, res)
);
router.delete("/usuarios/:id", (req: Request, res: Response) =>
  deleteUser(req, res)
);

router.post("/upload/:id", upload.single("file"), uploadImage);

router.get("/upload/:id/image", getUserImage);

router.get("/usuarios/find", (req: Request, res: Response) =>
  getUserById(req, res)
);

export default router;
