// import { prisma } from "../../lib/prisma";
export {};
// export const getRols = async () => {
//   try {
//     const allRols = await prisma.rol.findMany();
//     return allRols.length ? allRols : null;
//   } catch (error) {
//     return error;
//   }
// };

// export const updateRol = async (id:any,newName:any) => {
//   try {
//     if(!newName || !id) return null
//     const changeRol = await prisma.rol.update({
//       where: {
//         id: id,
//       },
//       data: {
//         name: newName
//       }
//     });
//     return changeRol ? changeRol : null;
//   } catch (error) {
//     return error;
//   }
// };

// export const postRol = async (name: any) => {
//   try {
//     if (!name) return null;
//     const findDuplicateRol = await prisma.rol.findFirst({
//       where: {
//         name: name,
//       },
//     });
//     if (findDuplicateRol) return null;
//     const addRol = await prisma.rol.create({
//       data: {
//         name
//       }
//     });
//     return addRol ? addRol : null;
//   } catch (error) {
//     return error;
//   }
// };
