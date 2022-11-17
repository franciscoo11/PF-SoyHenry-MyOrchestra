import { prisma } from "../../lib/prisma";
export {};
export const getRols = async () => {
  try {
    const allRols = await prisma.rol.findMany();
    return allRols.length ? allRols : null;
  } catch (error) {
    return error;
  }
};

export const updateRol = async (user_id:any,rolId:any) => {
  try {
    if(!rolId || !user_id) return null
    const changeRol = await prisma.user.update({
      where: {
        id: user_id,
      },
      data:{
        rolId:rolId
      }
    })
    return changeRol ? changeRol : null;
  } catch (error) {
    return error;
  }
};

export const postRol = async (user_id:any, rolId:any) => {
  try {
    if (!user_id || !rolId) return null;
    const addRol = await prisma.user.update({
        where: {
          id: user_id,
        },
        data:{
          rolId:rolId
        }
    })
    return addRol ? addRol : null;
  } catch (error) {
    return error;
  }
};
