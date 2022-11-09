import { prisma } from "../../lib/prisma";
import { User } from "../interfaces/User";


export const postUser = async (body: any) => {
  try {
    console.log(body);
    
    const { name, email, password } = body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(user) throw('Email is already')
    if (!name || !email || !password ) return null;
    // TO CHECK AVATAR OR PICTURE SEND DB
    const addUser = await prisma.user.create({
      data: {
        ...body,
        name: name,
        email: email,
        password: password
      },
    });
    return addUser;
  } catch (error) {
    return error;
  }
};

export const getUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: any, body: any) => {
  try {
    if(!id) throw('Please enter a id')
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if(!user) throw('User not found, please check and try again')
    const getUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: body
    });
    return getUser;
  } catch (error) {
    return error;
  }
};

export const logicDeleteUser = async (id: any) => {
  try {
    if(!id) throw('Please enter a id')
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data:{
        is_active: false
      }
    })
    return user
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: any) => {
  try {
    if(!id) throw('Please enter a id')
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    });
    return user;
  } catch (error) {
    return error;
  }
};