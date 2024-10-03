import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id: number;
  email: string;
  name: string | null;
  school: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const createUser = async (
  email: string,
  name: string | null,
  school: string
): Promise<void> => {
  await prisma.user.create({
    data: {
      email,
      name,
      school,
    },
  });
};

export const updateUser = async (
  id: number,
  email: string,
  name: string | null,
  school: string
): Promise<User | null> => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      email,
      name,
      school,
    },
  });
  return updatedUser;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return !!deletedUser;
};

export const userService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
