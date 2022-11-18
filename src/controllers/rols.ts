import { prisma } from "../../lib/prisma";
export {};
export const getRols = async () => {
  try {
    const allRols = await prisma.rols.findMany();
    return allRols.length ? allRols : null;
  } catch (error) {
    return error;
  }
};

export const buildRol = async (body:any) => {
  try {
    if(!body) return null
    const addRol = await prisma.rols.create({
      data:{
        name: body.name
      }
    })
    return addRol ? addRol : null
  } catch (error) {
    return error;
  }
};

export const updateRol = async (rol_id:any, body:any) => {
  try {
    if(!body) return null
    const modifyRol = await prisma.rols.update({
      where:{
        id:rol_id
      },
      data:{
        name: body.name
      }
    })
    return modifyRol ? modifyRol : null
  } catch (error) {
    return error;
  }
};
