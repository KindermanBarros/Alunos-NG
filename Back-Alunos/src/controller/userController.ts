import { Request, Response } from "express";
import { userService } from "../service/userService";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, school } = req.body;
  try {
    const createdUser = await userService.createUser(email, name, school);
    res.status(201).json({ user: createdUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, school } = req.query;

  if (!email || !name || !school) {
    res.status(400).json({ error: "Missing required query parameters" });
    return;
  }

  try {
    const user = await userService.getId(
      email as string,
      name as string,
      school as string
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUser(Number(req.params.id));
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, name, school } = req.body;
  try {
    const updatedUser = await userService.updateUser(
      Number(id),
      email,
      name,
      school
    );
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const success = await userService.deleteUser(Number(id));
    if (success) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  try {
    const updatedUser = await userService.uploadImage(Number(id), file);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const image = await userService.getUserImage(Number(id));
    res.status(200).json({ image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
