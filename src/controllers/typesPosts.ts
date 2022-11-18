import { prisma } from "../../lib/prisma";

export const getAllTypesPost = async () => {
  try {
    const allTypesPosts = await prisma.type_post.findMany();
    return allTypesPosts ? allTypesPosts : null;
  } catch (error) {
    return error;
  }
};

export const addTypePost = async (name: string) => {
  try {
    if (!name) return null;
    const findDuplicateTypePost = await prisma.type_post.findUnique({
      where: {
        name: name,
      },
    });
    if (findDuplicateTypePost) return null;
    const generateTypePost = await prisma.type_post.create({
      data: {
        name,
      },
    });
    return generateTypePost ? generateTypePost : null;
  } catch (error) {
    return error;
  }
};
