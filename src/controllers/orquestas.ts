import { prisma } from "../../lib/prisma";
interface query{
  name: string;
  creation_date: string;
  location: string;
}

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

export const postOrchestras = async (body: any) => {
  const { name, description } = body;

  const orchestras = await prisma.orchestra.create({
    data: {
      name,
      description,
    },
  });

  return orchestras;
};
