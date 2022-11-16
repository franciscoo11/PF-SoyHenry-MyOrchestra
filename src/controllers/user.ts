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
    const { name, email, password, year_of_birth } = body;
    if (!name || !email || !password || !year_of_birth) return null;
    if (!yearValidation(year_of_birth)) return null;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) return null;

    // TO CHECK AVATAR OR PICTURE SEND DB
    const addUser = await prisma.user.create({
      data: {
        ...body,
        name: name,
        email: email,
        password: password,
        year_of_birth: year_of_birth,
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
      const allUsers = await prisma.user.findMany({
        include:{
          favorites:true
        }
      });
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
    if (!id || !body) return null;
    const getUser = await prisma.user.update({
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
    const user = await prisma.user.update({
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
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};
