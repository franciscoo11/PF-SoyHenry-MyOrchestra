import { idText } from "typescript";
import { prisma } from "../../lib/prisma";
interface query{
  name: string;
  creation_date: string;
  location: string;
}
//GET ORCHESTRAS
export const getOrchestras = async (query:any) => {
  const {name, creation_date, location} = query
  if(name){
  const az = await prisma.orchestra.findMany({orderBy:{name: 'asc'}})
  const za = await prisma.orchestra.findMany({orderBy:{name: 'desc'}})
  if(name === 'asc') return az
  if(name === 'desc') return za
  const foundName = await prisma.orchestra.findMany({
    where: { name: { contains: name.toLowerCase() } } })
    if(foundName.length) return foundName
    else return 'not found'
  }
  if(location){
    const foundLocation = await prisma.orchestra.findMany({
      where: { location: { contains: location.toLowerCase() } } })
      if(foundLocation.length) return foundLocation
      else return 'not found'
  }
  if(creation_date){
    let lastDates = creation_date === 'asc' ? await prisma.$queryRaw`SELECT "id", "name", "creation_date" FROM "Orchestra" ORDER BY creation_date ASC` 
      : await prisma.$queryRaw`SELECT "id", "name", "creation_date" FROM "Orchestra" ORDER BY creation_date DESC`
      return lastDates
  }
  const orchestras = await prisma.orchestra.findMany();

  return orchestras;
};
//GET ORCHESTRAS BY ID
export const getOrchestrasById = async (id: any) => {
    const orchestra = await prisma.orchestra.findUnique({
      where: { id: id },
    });
    return orchestra;
};

//POST ORCHESTRAS
export const postOrchestras = async (body: any) => {
  try {
    const {name,donation_account,phone, createdAt, updatedAt} = body;
    if(!name || !donation_account || !phone) throw ('missing values')
    const orchestras = await prisma.orchestra.create({
      data:{
        ...body,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt)
      }
    });
    return orchestras;
  } catch(error) {
    console.log(`something was wrong in post, values received:${body} `, error)
  }

};
//BORRADO LOGICO
export const logicDeleteOrchestra = async (id:any) => {
  const deactivate = await prisma.orchestra.update({
    where:{
      id:id
    },
    data: {
      is_active: false
    }
  })
  return deactivate
}
//DELETE ORCHESTRAS
export const deleteOrchestra = async (id:any) => {
    const orchestraDelete = await prisma.orchestra.delete({
      where: {id:id},
    });
    return orchestraDelete;
};

//UPDATE ORCHESTRAS
// working in global update
export const updateOrchestra = async (id:any, body:any) => {
  try {
    const updateOrchestra = await prisma.orchestra.update({
      where: {
        id,
      },
      data:body,
      
    });
    return updateOrchestra;
  } catch (error) {
    return console.log(error,` cant update, values received:${id}, ${body}`)
  }
};

