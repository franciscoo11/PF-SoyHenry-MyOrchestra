import { prisma } from "../../lib/prisma";
import { convertToCloudinaryUrlOrchestras } from "./cloudinary";

//GET ORCHESTRAS
export const getOrchestras = async (query: any) => {
  const { name, creation_date, location, orchestra_TypeId, page, resources, order,admin } = query
  let isBaned = true; 
  if (admin){
    isBaned=false
  }
  const results = (await prisma.orchestras.findMany(
    {where:{
      OR: [
        {
          is_active: true
        },
        { is_active: isBaned},
      ],
    }}
  )).length
  

  
  const fulldataorder = async (orderprop: any, order: any, prop1: any, prop2: any, date1: any, date2: any) => {
    const data = await prisma.orchestras.findMany(
      {
        orderBy: { [orderprop]: order },
        take: resources * 1 || 4,
        skip: page * resources || page * 4 || 0,
        where: {
          [prop1]: { contains: date1, mode: 'insensitive' },
          [prop2]: date2,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })
  const results = (await prisma.orchestras.findMany(
    {
      orderBy: { [orderprop]: order },
      where: {
        [prop1]: { contains: date1, mode: 'insensitive' },
        [prop2]: date2,
        OR: [
          {
            is_active: true
          },
          { is_active: isBaned},
        ],
      }
    })).length
    return { results, data }
  }

  const dataandorder = async (orderprop: any, order: any, prop1: any, date1: any) => {
    let trimedName = date1.toLowerCase().trim();
    let aux = date1;
    if (prop1 != "orchestra_TypeId") {
      aux = { contains: trimedName, mode: 'insensitive' }
    }
    const data = await prisma.orchestras.findMany(
      {
        orderBy: { [orderprop]: order },
        take: resources * 1 || 4,
        skip: page * resources || page * 4 || 0,
        where: {
          [prop1]: aux,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })
    const results = (await prisma.orchestras.findMany(
      {
        orderBy: { [orderprop]: order },
        where: {
          [prop1]: aux,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })).length
    return { results, data }
  }

  const fulldata = async (prop1: any, prop2: any, date1: any, date2: any) => {
    const data = await prisma.orchestras.findMany(
      {
        take: resources * 1 || 4,
        skip: page * resources || page * 4 || 0,
        where: {
          [prop1]: { contains: date1, mode: 'insensitive' },
          [prop2]: date2,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })
    const results = (await prisma.orchestras.findMany(
      {
        where: {
          [prop1]: { contains: date1, mode: 'insensitive' },
          [prop2]: date2,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })).length
    return { results, data }
  }

  const dataonly = async (prop1: any, date1: any) => {
    let trimedName = date1.toLowerCase().trim();
    let aux = date1;
    if (prop1 != "orchestra_TypeId") {
      aux = { contains: trimedName, mode: 'insensitive' }
    }
    const data = await prisma.orchestras.findMany(
      {
        take: resources * 1 || 4,
        skip: page * resources || page * 4 || 0,
        where: {
          [prop1]: aux,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })
    const results = (await prisma.orchestras.findMany(
      {
        where: {
          [prop1]: aux,
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        }
      })).length
    return { results, data }
  }

  const onlyorder = async (orderprop: any, order: any) => {
    const data = await prisma.orchestras.findMany(
      {
        where:{
          OR: [
            {
              is_active: true
            },
            { is_active: isBaned},
          ],
        },
        orderBy: { [orderprop]: order },
        take: resources * 1 || 4,
        skip: page * resources || page * 4 || 0,
      })
    return { results, data }
  }

  if (order && location && orchestra_TypeId) return fulldataorder("name", order, "location", "orchestra_TypeId", location, orchestra_TypeId)
  if (creation_date && location && orchestra_TypeId) return fulldataorder("name", creation_date, "location", "orchestra_TypeId", location, orchestra_TypeId)

  if (order && location) return dataandorder("name", order, "location", location)
  if (order && orchestra_TypeId) return dataandorder("name", order, "orchestra_TypeId", orchestra_TypeId)
  if (order && name ) return dataandorder("name",order,"name",name)
  if (creation_date && name ) return dataandorder("creation_date",creation_date,"name",name)
  if (creation_date && location) return dataandorder("creation_date", creation_date, "location", location)
  if (creation_date && orchestra_TypeId) return dataandorder("creation_date", creation_date, "orchestra_TypeId", orchestra_TypeId)
  if (name && orchestra_TypeId) return fulldata("name", "orchestra_TypeId", name, orchestra_TypeId)
  if (name && location) return fulldata("location", "name", location, name)


  if (creation_date) return onlyorder("creation_date", creation_date)
  if (location) return dataonly("location", location)
  if (orchestra_TypeId) return dataonly("orchestra_TypeId", orchestra_TypeId)
  if (order) return onlyorder("name", order)
  if (name) return dataonly("name", name)

  const data = await prisma.orchestras.findMany({

    where: {
      OR: [
        {
          is_active: true
        },
        { is_active: isBaned},
      ],
    },
    take: resources * 1 || 4,
    skip: page * resources || page * 4 || 0,
  })

 

  return { results, data }
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
    if (!body) return undefined
    const { name, phone, donation_account, cover, logo } = body;
    let cloudinaryCoverUrl = "/orchestra_cover.png";
    let cloudinaryLogoUrl = "/blank_logo.png";
    let folder = "";
    if (cover) {
      folder = "cover";
      cloudinaryCoverUrl = await convertToCloudinaryUrlOrchestras(
        cover,
        name,
        folder
      );
    }
    if (logo) {
      folder = "logo";
      cloudinaryLogoUrl = await convertToCloudinaryUrlOrchestras(
        logo,
        name,
        folder
      );
    }
    if (!name || !donation_account || !phone) return undefined
    const orchestras = await prisma.orchestras.create({
      data: {
        ...body,
        cover: cloudinaryCoverUrl,
        logo: cloudinaryLogoUrl
      }
    });
    return orchestras ? orchestras : undefined;
  } catch (error) {
    return error
  }

};
//BORRADO LOGICO
export const logicDeleteOrchestra = async (id: any) => {
  try {
    const orchestra = await prisma.orchestras.findUnique({where:{id}})
    if(orchestra?.is_active){
      const deactivate = await prisma.orchestras.update({
        where: {
          id: id
        },
        data: {
          is_active: false
        }
      })
      return deactivate
    }
    if(!orchestra?.is_active){
      const activate = await prisma.orchestras.update({
        where: {
          id: id
        },
        data: {
          is_active: true
        }
      })
      return activate
    }
   
   
  } catch (error) {
    return error
  }

}

//DELETE ORCHESTRAS
export const deleteOrchestra = async (id: any) => {
  try {
    if (!id) return undefined

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
    const { name, cover, logo } = body;
    let cloudinaryCoverUrl = cover;
    let cloudinaryLogoUrl = logo;
    let folder = "";
    if (cover) {
      folder = "cover";
      cloudinaryCoverUrl = await convertToCloudinaryUrlOrchestras(
        cover,
        name,
        folder
      );
    }
    if (logo) {
      folder = "logo";
      cloudinaryLogoUrl = await convertToCloudinaryUrlOrchestras(
        logo,
        name,
        folder
      );
    }
    const updateOrchestra = await prisma.orchestras.update({
      where: {
        id,
      },
      data: {
        ...body,
        logo: cloudinaryLogoUrl,
        cover: cloudinaryCoverUrl
      },

    });
    return updateOrchestra ? updateOrchestra : undefined;
  } catch (error) {
    return error
  }
};

