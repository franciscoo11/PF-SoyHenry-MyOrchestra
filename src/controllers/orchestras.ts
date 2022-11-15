import { prisma } from "../../lib/prisma";

const filter_query = (datos: any, location: string, orchestra_TypeId: string): object[] => {
  let newdatos = datos
  const filterParams: any = { location: location, orchestra_TypeId: orchestra_TypeId }
  for (const property in filterParams) {
    filterParams[property] ? newdatos = newdatos.filter(
      (orchestradata: any) => orchestradata[property].toLowerCase().trim() === filterParams[property].toLowerCase().trim()
    ) : null
  }
  return newdatos
}

//GET ORCHESTRAS
export const getOrchestras = async (query: any) => {
  const { name, creation_date, location, orchestra_TypeId } = query
  if (name) {
    const az = await prisma.orchestra.findMany({ orderBy: { name: 'asc' } })
    const za = await prisma.orchestra.findMany({ orderBy: { name: 'desc' } })
    if (name === 'asc' && !location) return az
    if (name === 'desc' && !location) return za
    if (name === 'desc' && (location || orchestra_TypeId)) return filter_query(za, location, orchestra_TypeId)
    if (name === 'asc' && (location || orchestra_TypeId)) return filter_query(az, location, orchestra_TypeId)
    const trimedName = name.toLowerCase().trim()
    const foundName = await prisma.orchestra.findMany({
      where: { name: { contains: trimedName, mode:'insensitive' } }
    })
    if (foundName.length) return foundName
    else return 'not found'
  }

  if (creation_date) {
    let lastDates = creation_date === 'asc' ? await prisma.$queryRaw`SELECT "id", "name", "creation_date", "location" FROM "Orchestra" ORDER BY creation_date ASC`
      : await prisma.$queryRaw`SELECT "id", "name", "creation_date", "location" FROM "Orchestra" ORDER BY creation_date DESC`
    if (!location) return lastDates
    if (location || orchestra_TypeId) return filter_query(lastDates, location, orchestra_TypeId)
  }


  const orchestras = await prisma.orchestra.findMany();
  if (location || orchestra_TypeId) return filter_query(orchestras, location, orchestra_TypeId)
  return orchestras ? orchestras : undefined;
};

//GET ORCHESTRAS BY ID
export const getOrchestrasById = async (id: any) => {
  const orchestra = await prisma.orchestra.findUnique({
    where: { id: id },
  });
  return orchestra ? orchestra : undefined;
};

//POST ORCHESTRAS
export const postOrchestras = async (body: any) => {
  try {
    if(!body) return undefined
    const { name, phone, donation_account } = body;
    if (!name || !donation_account || !phone) return undefined
    const orchestras = await prisma.orchestra.create({
      data: body
    });
    return orchestras ? orchestras : undefined;
  } catch (error) {
    return error
  }

};
//BORRADO LOGICO
export const logicDeleteOrchestra = async (id: any) => {
  try {
    const deactivate = await prisma.orchestra.update({
      where: {
        id: id
      },
      data: {
        is_active: false
      }
    })
    return deactivate ? deactivate : null
  } catch (error) {
    return error
  }
  
}
//DELETE ORCHESTRAS
export const deleteOrchestra = async (id: any) => {
  try {
    if(!id) return undefined
    const orchestraDelete = await prisma.orchestra.delete({
      where: { id: id },
    });
    return orchestraDelete ? orchestraDelete : null;
  } catch (error) {
    return error
  }
  
};

//UPDATE ORCHESTRAS
export const updateOrchestra = async (id: any, body: any) => {
  try {
    const updateOrchestra = await prisma.orchestra.update({
      where: {
        id,
      },
      data: body,

    });
    return updateOrchestra ? updateOrchestra : undefined;
  } catch (error) {
    return error
  }
};

