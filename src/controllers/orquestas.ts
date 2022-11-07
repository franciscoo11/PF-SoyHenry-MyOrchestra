import { prisma } from "../../lib/prisma";
export const getOrchestras = async () => {
  const orchestras = await prisma.Orchestra.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });

  return orchestras;
};

export const postOrchestras = async (body: any) => {
  const { name, description } = body;

  const orchestras = await prisma.Orchestra.create({
    data: {
      name,
      description,
    },
  });

  return orchestras;
};
