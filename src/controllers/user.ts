import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { transporter, emailerReg, emailerUpdate } from '../../config/nodemailer';
import { convertToCloudinaryUrl } from "./cloudinary";

const hashPassword = (password:string) => {
  const hash = bcrypt.hashSync(password)
  return hash
}

const check_password = (password:string) => {
  const regex_pw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
  return regex_pw.test(password)
};

export const postUser = async (body: any) => {
  try {
    if (!body) return null;
    const { name, email, password, rolId, birthday,cover } = body;
    if ( !email || !password ) return null;
    const cloudinaryCoverUrl= await convertToCloudinaryUrl(cover);
    if(!check_password(password)) return null
    const addUser = await prisma.users.upsert({
      where: {
        email: email,
      },
      
      update: {
        ...body,
        name: name,
        email: email,
        password: hashPassword(password),
        rolId: rolId,
        birthday: new Date(birthday),
        cover:cloudinaryCoverUrl
      },

      create: {
        ...body,
        password: hashPassword(password),
        birthday: new Date(birthday),
        cover:cloudinaryCoverUrl
      },
    });
    await transporter.sendMail(emailerReg(addUser))
    return addUser ? addUser : null;
  } catch (error) {
    return console.log(error);
  }
};

export const getUsers = async (id?: any) => {
  try {
    if (!id) {
      const allUsers = await prisma.users.findMany({
        include:{
          user_on_orchestra:true
        }
      });
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
    await transporter.sendMail(emailerUpdate(getUser))
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
