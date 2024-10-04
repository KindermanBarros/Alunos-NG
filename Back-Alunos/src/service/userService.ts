import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { User } from "../interfaces/user";
import { UserResponse } from "../interfaces/userResponse";

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      school: true,
      image: true,
    },
  });

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    school: user.school,
    hasImage: !!user.image,
  }));
};

const createUser = async (
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

const getUser = async (id: number): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
};

const updateUser = async (
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

const deleteUser = async (id: number): Promise<boolean> => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return !!deletedUser;
};

const uploadImage = async (id: number, file: Express.Multer.File) => {
  const uploadDir = path.join(__dirname, "../../uploads");
  const filePath = path.join(uploadDir, file.filename);

  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { image: true },
    });

    if (user && user.image) {
      console.log(`User with ID: ${id} already has an image.`);
      return user;
    }

    console.log(`Reading file from: ${filePath}`);
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString("base64");
    const newFilePath = path.join(
      uploadDir,
      `${id}${path.extname(file.filename)}`
    );

    console.log(`Updating user with ID: ${id}`);
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { image: base64Image },
    });

    console.log(`Renaming file to: ${newFilePath}`);
    fs.renameSync(filePath, newFilePath);

    return updatedUser;
  } catch (error) {
    console.error(`Error in uploadImage: ${error.message}`);
    throw new Error(`Failed to upload file: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};

const getUserImage = async (id: number): Promise<string> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { image: true },
    });

    if (!user || !user.image) {
      throw new Error("Image not found");
    }

    return user.image;
  } catch (error) {
    throw new Error(`Failed to retrieve image: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
};

export const userService = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadImage,
  getUserImage,
};
