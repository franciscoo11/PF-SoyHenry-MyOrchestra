import { prisma } from "../../lib/prisma";
import { User } from "../interfaces/User";

interface email {
  name: string;
}

interface user {
    name: string;
    mail: string;
    avatar: string;
}

export const postUsers = async (body: User) => {
  try {
    const { name, mail, avatar, picture } = body;
    if (!name || !mail) return null;
    // TO CHECK AVATAR OR PICTURE SEND DB
    const addUser = await prisma.User.create({
      data: {
        name: name,
        mail: mail,
        avatar: avatar,
      },
    });
    return addUser;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const allUsers = await prisma.User.findMany();
    return allUsers;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (mail: email) => {
    try {
      const user = await prisma.User.findUnique({
        where: { mail: mail },
      });
      return user;
    } catch (error) {
      return error;
    }
  
};

export const updateUser = async (mail: email, body: User) => {
    try {
        const getUser = await prisma.User.update({
            where: {
                mail: mail
            },
            data: {
                body
            }
        })
        return getUser
    } catch (error) {
        return error
    }
}

export const deleteUser = async (mail: email) => {
    try {
        await prisma.User.update({
            where: {
                mail:mail,
            },
            data: {
                isActive: false
            },
        })
    } catch (error) {
        return error
    }
}
