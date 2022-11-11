import { prisma } from "../../lib/prisma";

export const postUser = async (body: any) => {
  try {
    const { name, email, password, year_of_birth } = body;
    if (!name || !email || !password || !year_of_birth) return null;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(user) return null;
  
    // TO CHECK AVATAR OR PICTURE SEND DB
    const addUser = await prisma.user.create({
      data: {
        ...body,
        name: name,
        email: email,
        password: password,
        year_of_birth: year_of_birth
      },
    });
    return addUser ? addUser : null;
  } catch (error) {
    return error;
  }
};

export const getUsers = async (id?: any) => {
  try {
    if(!id){
      const allUsers = await prisma.user.findMany();
      return allUsers.length ? allUsers : null;
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: any, body: any) => {
  try {
    if(!id) return null
    //if(!user) throw('User not found, please check and try again')
    const getUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: body
    });
    return getUser ? getUser : null;
  } catch (error) {
    return error;
  }
};

export const logicDeleteUser = async (id: any) => {
  try {
    if(!id) return null
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data:{
        is_active: false
      }
    })
    return user ? user : null;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: any) => {
  try {
    if(!id) return null
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};
