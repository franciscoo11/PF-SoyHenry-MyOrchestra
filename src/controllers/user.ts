import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import {
  transporter,
  emailer,
} from "../../config/nodemailer";
import {convertToCloudinaryUrlUser } from "./cloudinary";


const hashPassword = (password: string) => {
  const hash = bcrypt.hashSync(password);
  return hash;
};

const check_password = (password: string) => {
  const regex_pw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return regex_pw.test(password);
};

export const postUser = async (body: any, query: any) => {
  try {
    if (!body) return null;
    const { name, email, password, rolId, avatar, cover } = body;
    if (!email) return null;
    let cloudinaryCoverUrl = "/user_cover.png";
    let cloudinaryAvatarUrl = "/blank_profile.png";
    let folder = "";

    if (cover) {
      folder = 'cover';
      cloudinaryCoverUrl = await convertToCloudinaryUrlUser(
        cover,
        email,
        folder
      );
    }
    if (avatar) {
      folder = 'avatar';
      cloudinaryAvatarUrl = await convertToCloudinaryUrlUser(
        avatar,
        email,
        folder
      );
    }
    
    if (query.isGmail) {
      const findUser = await prisma.users.findFirst({
        where: {
          email: email
        }
      })
      if(findUser) return findUser
      const addUserFromGmail = await prisma.users.create({
        data: {
          name: name,
          email: email,
          avatar: cloudinaryAvatarUrl,
        },
        include:{
          rol:true
        }
      });
      await transporter.sendMail(
        emailer(
          addUserFromGmail,
          "Registro My Orchestras",
          `Gracias por registrarte ${addUserFromGmail.name}`,
          `
          Tu usuario es: ${addUserFromGmail.email}, estamos muy contentos de que formes parte de nuestra comunidad. Te invitamos a que visites nuestra plataforma y puedas enterarte de lo que esta pasando...`
        )
      );
      return addUserFromGmail ? addUserFromGmail : null;
    } else {
      if (!check_password(password)) return null;
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
          avatar: cloudinaryAvatarUrl,
          cover: cloudinaryCoverUrl
        },
  
        create: {
          ...body,
          avatar: cloudinaryAvatarUrl,
          cover: cloudinaryCoverUrl,
          password: hashPassword(password),
        },
        include:{
          rol:true
        }
      });
      await transporter.sendMail(
        emailer(
          addUser,
          "Registro My Orchestras",
          `Gracias por registrarte ${addUser.name}`,
          `
          Tu usuario es: ${addUser.email}, estamos muy contentos de que formes parte de nuestra comunidad. Te invitamos a que visites nuestra plataforma y puedas enterarte de lo que esta pasando...`
        )
      );
      return addUser ? addUser : null;
    }

  } catch (error) {
    return error;
  }
};

export const getUsers = async (query:any) => {
  try {
    if(query.userId){
      const findUserById = await prisma.users.findUnique({
        where:{
          id: query.userId
        }
      })
      return findUserById ? findUserById : null
    }
    if (!query.email) {
      const allUsers = await prisma.users.findMany({
        include: {
          rol: true,
        },
      });
      return allUsers.length ? allUsers : null;
    }
    const user = await prisma.users.findUnique({
      where: { email: query.email },
      include: {
        rol: true
      }
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (query: any, body: any) => {
  try {
    let {avatar, cover, password, name } = body;

    if (!query.email || !body) return null;
    let cloudinaryCoverUrl = cover;
    let cloudinaryAvatarUrl = avatar;
    let folder = "";

    if (cover) {
      folder = 'cover';
      cloudinaryCoverUrl = await convertToCloudinaryUrlUser(
        cover,
        query.email,
        folder
      );
    }
    if (avatar) {
      folder = 'avatar';
      cloudinaryAvatarUrl = await convertToCloudinaryUrlUser(
        avatar,
        query.email,
        folder
      );
    }
    ;

    if(password) {
      password = hashPassword(password)
    }

    const getUser = await prisma.users.update({
      where: {
        email: query.email,
      },
      data:{
        ...body,
        cover:cloudinaryCoverUrl,
        avatar:cloudinaryAvatarUrl,
        name: name,
        password: password,
      },
    });

    await transporter.sendMail(
      emailer(
        getUser,
        "Actualización de su cuenta",
        `Hola ${getUser.name}, te informamos que algunos datos de tu cuenta han sido modificados`,
        `Si no fuiste tu, comunicate con nostros a la brevedad!`
      )
    );
    return getUser ? getUser : null;
  } catch (error) {
    return error;
  }
};

export const logicDeleteUser = async (email: any) => {
  try {
    const user = await prisma.users.findUnique({where:{email}})
    if(user?.is_active){
      const deactivate = await prisma.users.update({
        where: {
          email:email
        },
        data: {
          is_active: false
        }
      })

      await transporter.sendMail(
        emailer(
          deactivate,
          "Baneo temporal de My Orchestras",
          `Hola ${deactivate.name}, debido alguna infracción se ha restringido el acceso a la plataforma.`,
          `Para más informacion comunicate por email o por nuestos canales de comunicación.`
        )
      );

      return deactivate
    }

    if(!user?.is_active){
      const activate = await prisma.users.update({
        where: {
          email:email
        },
        data: {
          is_active: true
        }
      })

      return activate
    }
   
   
  } catch (error) {
    return error
  }
};


export const deleteUser = async (email: any) => {
  try {
    if (!email) return null;
    const user = await prisma.users.delete({
      where: {
        email: email,
      },
    });
    return user ? user : null;
  } catch (error) {
    return error;
  }
};
