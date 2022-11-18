import { prisma } from "../../lib/prisma";


//GET ORCHESTRAS
export const getOrchestras = async (query: any) => {

const { name, creation_date, location, orchestra_TypeId,page,resources,order } = query

  const fulldataorder =async(orderprop:any, order:any,prop1:any,prop2:any,date1:any,date2:any)=>{
    const datos= await prisma.orchestras.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{   
          [prop1]:{ contains: date1, mode:'insensitive' },
          [prop2]:date2 
        }
      })   
      return datos
  }
  
  const dataandorder =async(orderprop:any,order:any,prop1:any,date1:any)=>{
    let trimedName = date1.toLowerCase().trim();
    let aux=date1;
    if(prop1!="orchestra_TypeId"){
       aux = { contains: trimedName, mode:'insensitive' }
    }
    const datos= await prisma.orchestras.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{      
          [prop1]:aux 
        }
      })
      return datos
  }

  const fulldata =async(prop1:any,prop2:any,date1:any,date2:any)=>{
    const datos= await prisma.orchestras.findMany( 
      { 
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{   
          [prop1]:{ contains: date1, mode:'insensitive' },
          [prop2]:date2 
        }
      })   
      return datos
  }
  
  const dataonly =async(prop1:any,date1:any)=>{
    let trimedName = date1.toLowerCase().trim();
    let aux=date1;
    if(prop1!="orchestra_TypeId"){
       aux = { contains: trimedName, mode:'insensitive' }
    }
    const datos= await prisma.orchestras.findMany( 
      {
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{      
          [prop1]:aux 
        }
      })
      return datos
  }

  const onlyorder =async(orderprop:any,order:any)=>{
  
    const datos= await prisma.orchestras.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
      })
      return datos
  }

  if(order&&location&&orchestra_TypeId)return fulldataorder( "name",order,"location","orchestra_TypeId",location,orchestra_TypeId)
  if(order&&location)return dataandorder("name",order,"location",location)
  if(order&&orchestra_TypeId)return dataandorder("name",order,"orchestra_TypeId",orchestra_TypeId)

  if(creation_date&&location&&orchestra_TypeId)return fulldataorder( "name",creation_date,"location","orchestra_TypeId",location,orchestra_TypeId)
  if(creation_date&&location)return dataandorder("creation_date",creation_date,"location",location)
  if(creation_date&&orchestra_TypeId)return dataandorder("creation_date",creation_date,"orchestra_TypeId",orchestra_TypeId)

  if(location&&orchestra_TypeId)return fulldata("location","orchestra_TypeId",location,orchestra_TypeId)
  if(location)return dataonly("location",location)
  if(orchestra_TypeId)return dataonly("orchestra_TypeId",orchestra_TypeId)

  if(order)return onlyorder("name",order)
  if(creation_date)return onlyorder("creation_date",creation_date)

  if(name)return dataandorder("name",order,"name",name)

  return await prisma.orchestras.findMany()
};

//GET ORCHESTRAS BY ID
export const getOrchestrasById = async (id: any) => {
  const orchestra = await prisma.orchestras.findUnique({
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
    const orchestras = await prisma.orchestras.create({
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
    const deactivate = await prisma.orchestras.update({
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
    const orchestraDelete = await prisma.orchestras.delete({
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
    const updateOrchestra = await prisma.orchestras.update({
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

