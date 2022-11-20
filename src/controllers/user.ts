import { prisma } from "../../lib/prisma";

const yearValidation = (year: any) => {
  var text = /^[0-9]+$/;
  if (year.length < 4) return null;
  if (year != 0) {
    if (year != "" && !text.test(year)) return null;
    var current_year = new Date().getFullYear();
    if (year < 1920 || year > current_year) return null;
    return true;
  }
};

export const postUser = async (body: any) => {
  try {
    if (!body) return null;
    const { name, email, password, rolId, birthday } = body;
    if ( !email || !password ) return null;

    
    const addUser = await prisma.users.upsert({
      where: {
        email: email,
      },
      
      update: {
        ...body,
        name: name,
        email: email,
        password: password,
        rolId: rolId,
        birthday: new Date(birthday),
      },

      create: {
        ...body,
        birthday: new Date(birthday)
      },
    });
    return addUser ? addUser : null;
  } catch (error) {
    return console.log(error);
  }
};

export const getUsers = async (id?: any) => {
  try {
    if (!id) {
      const allUsers = await prisma.users.findMany();
      return allUsers.length ? allUsers : null;
    }
    const user = await prisma.users.findUnique({
      where: { id: id },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id: any, body: any) => {
  try {
    if (!id || !body) return null;
    const getUser = await prisma.users.update({
      where: {
        id: id,
      },
      data: body,
    });
    return getUser ? getUser : null;
  } catch (error) {
    return error;
  }
};

export const logicDeleteUser = async (id: any) => {
  try {
    if (!id) return null;
    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        is_active: false,
      },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (id: any) => {
  try {
    if (!id) return null;
    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};
