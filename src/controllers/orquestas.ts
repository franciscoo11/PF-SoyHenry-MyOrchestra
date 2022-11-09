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
  const foundName = await prisma.orchestra.findMany({
    where: { name:name.toLowerCase() } })
    if(foundName.length) return foundName
    else return 'not found'
  }
  if(location){
    const foundLocation = await prisma.orchestra.findMany({
      where: { location: location } })
      if(foundLocation.length) return foundLocation
      else return 'not found'
  }
  if(creation_date){
    const lastDates = await prisma.orchestra.findMany({ 
      orderBy: { creation_date: 'asc' } })
    const firstDates = await prisma.orchestra.findMany({ 
      orderBy:{ creation_date: 'desc' } })
    if(creation_date === 'desc') return firstDates
    else return lastDates
  }
  const orchestras = await prisma.orchestra.findMany();

  return orchestras;
};

//POST ORCHESTRAS
export const postOrchestras = async (body: any) => {
  try {
    const {name,donation_account,phone} = body;
    if(!name || !donation_account || !phone) throw ('missing values')
    const orchestras = await prisma.orchestra.create({
      data:body
    });
  
    return orchestras;
  } catch (error) {
    console.log(`something was wrong in post, values received:${body} `, error)
  }

};
//DELETE ORCHESTRAS
export const deleteOrchestra = async (name2:any) => {

    const orchestraDelete = await prisma.orchestra.delete({
      where: {name:name2},
    });
    return orchestraDelete;
    
  
};

//UPDATE ORCHESTRAS
// working in global update


export const updateOrchestra = async (name:any, body:any) => {
  try {
    const updateOrchestra = await prisma.orchestra.update({
      where: {
        name,
      },
      data:body,
      
    });
    return updateOrchestra;
  } catch (error) {
    return console.log(error,` cant update, values received:${name}, ${body}`)
  }
};

// export const postOrchestras = async (body: any) => {
//   const { name, description } = body;

//   const orchestras = await prisma.orchestra.create({
//     data: {
//       name,
//       description,
//     },
//   });

//   return orchestras;
// };

