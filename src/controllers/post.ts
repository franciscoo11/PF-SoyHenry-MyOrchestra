import { prisma } from "../../lib/prisma";
//GET USERSPOST
export const getPost = async (query:any) => {
  try {
    const { event_date, views,resources,page,orchestraId, type_PostId, optionOrder } = query

    const results =  (await prisma.posts.findMany()).length

    const onlyorder =async(orderprop:any,order:any)=>{
      const data= await prisma.posts.findMany( 
        { orderBy: { [orderprop]: order },
        take: resources*1 ||4,
        skip: page*resources||page*4||0,
        where:{
          orchestraId: orchestraId
        },
        include:{
          comments:true,
          user_reaction:true,
          Orchestra: true,
          user: true
          
        }
        })
        return {results,data}
    }

    const dataandorder = async (orderprop: any, order: any, prop1: any, date1: any) => {
      const data = await prisma.posts.findMany(
        {
          orderBy: { [orderprop]: order },
          take: resources * 1 || 4,
          skip: page * resources || page * 4 || 0,
          where: {
            [prop1]: date1
          },
          include:{
            comments:true,
            user_reaction:true,
            Orchestra: true,
            user: true
            
        }
        })
  
  
      const results = (await prisma.posts.findMany(
        {
          orderBy: { [orderprop]: order },
          where: {
            [prop1]: date1
          }
        })).length
  
      return { results, data }
    }


    const fulldata = async (prop1: any, prop2: any, date1: any, date2: any, optionOrder:any ) => {
      const data = await prisma.posts.findMany(
        {
          take: resources * 1 || 4,
          skip: page * resources || page * 4 || 0,
          orderBy: { creation_date : optionOrder },
          where: {
            [prop1]: date1,
            [prop2]: date2
          },
          include:{
            user_reaction:true,
            comments:true,
            Orchestra: true,
            user: true
        }
        })
      const results = (await prisma.posts.findMany(
        {
          where: {
            [prop1]: date1,
            [prop2]: date2
          }
        })).length
      return { results, data }
    }

    const dataonly =async(prop1:any, data1:any)=>{
      const data= await prisma.posts.findMany( 
        {
          orderBy: {creation_date: "desc"},
        take: resources*1 ||4,
        skip: page*resources||page*4||0,
          where:{      
            [prop1]:data1
          },
          include:{
            user_reaction:true,
            comments:true,
            Orchestra: true,
            user: true
            
          }
        })

      const results= (await prisma.posts.findMany( 
          {
            where:{      
              [prop1]:data1
            },
            include:{
                comments:true
            }
          })).length
        return {results,data}
    }

    if(orchestraId && type_PostId) return fulldata("orchestraId","type_PostId", orchestraId,type_PostId, optionOrder)
    if(views&&type_PostId)return dataandorder("views",views,"type_PostId", type_PostId)
    if(views&&orchestraId)return dataandorder("views",views,"orchestraId", orchestraId)
    if(event_date&&type_PostId)return dataandorder("event_date",event_date,"type_PostId", type_PostId)
    if(event_date&&orchestraId)return dataandorder("event_date",event_date,"orchestraId", orchestraId)

    if(event_date)return onlyorder("event_date",event_date)
    if(views)return onlyorder("views",views)
    if(type_PostId)return dataonly("type_PostId", type_PostId)
    if(orchestraId) return dataonly("orchestraId", orchestraId)
    

    const data = await prisma.posts.findMany({
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
      include: {
        comments:true
      }}
      )

    return {results,data}
  } catch (error) {
    return null
  }
};


//POST USERSPOST
//logica fecha
function verifyDate(event_date: any) {
  let eventTest = event_date.trim();
  let validateYear = "";
  if (eventTest.length !== 10) return false;
  if (eventTest.includes("/202")) {
    validateYear = eventTest.substring(eventTest.length - 4);
    validateYear = validateYear.slice(2, 4);
    eventTest = eventTest.slice(0, -4);
    eventTest = eventTest + validateYear;
  }
  const date_regex =
    /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
  if (!date_regex.test(eventTest)) return false;
  
  var today = new Date();
  var dateForm = new Date(eventTest);
  // Comparamos solo las fechas => no las horas!!
  today.setHours(0, 0, 0, 0);
  dateForm.setHours(0, 0, 0, 0); // Lo iniciamos a 00:00 horas
  if (today < dateForm) {
    return true;
  } else {
    return false;
  }
}
//logica hora
function verifyHour(event_hour: any) {
  
  const date_regex = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/i;
  if (!date_regex.test(event_hour.trim())) return false;
  return true;
}

//requerimientos a la hora de escribir la fecha:
//si no tiene coherencia salta error
//la fecha debe ser puesta minimo un dia despues a la actual
//poner un 0 antes del numero en caso de ser inferior a 10, ejemplo: 05/12/2023
//formato dd/mm/yyyy (20/04/2022)

//requerimientos a la hora de escribir la hora:
//si no tiene coherencia salta error
//incluir am o pm
//formato 2:05 pm

function changeFormat(event_date:any){
  let newEvent_date:any = [];
  event_date.split("");
  newEvent_date[0] = event_date[3];
  newEvent_date[1] = event_date[4];
  newEvent_date[2] = event_date[2];
  newEvent_date[3] = event_date[0];
  newEvent_date[4] = event_date[1];
  newEvent_date[5] = event_date[5];
  newEvent_date[6] = event_date[6];
  newEvent_date[7] = event_date[7];
  newEvent_date[8] = event_date[8];
  newEvent_date[9] = event_date[9];
  newEvent_date = newEvent_date.join("");
  return newEvent_date;
}

export const postPost = async (body: any) => {
  try {
    //estos datos son obligatorios por ahora mientras se termina de definir cuales van a ser los obligatorios en el modelo post
    const { title, content } = body;
    // let newFormatDate= changeFormat(event_date);;
    
    
    if (!title || !content) return null;
    // if (event_hour && !event_date) return null;
    // if(!event_hour && event_date) return null;
     
    // if (verifyDate(newFormatDate) === false) return null;
    // if (verifyHour(event_hour) === false) return null;

    await prisma.posts.create({
      data: body,
    });
    return body ? body : null;
  } catch (error) {
    return error
  }
};

//PUT USERSPOST
export const putPost = async (post_id: any, body: any) => {
  try {
    if (!post_id || !body) return null;
    await prisma.posts.update({
      where: {
        id: post_id,
      },
      data: body,
    });
    return body ? body : null;
  } catch (error) {
    return null;
  }
};

//DELETE USERSPOST

export const logicDeletePost = async (post_id: any) => {
  try {
    if (!post_id) return null;
    await prisma.posts.update({
      where: {
        id: post_id,
      },
      data: {
        is_active: false,
      },
    });
    return post_id ? post_id : null;
  } catch (error) {
    return null;
  }
};

export const deletePost = async (post_id: any) => {
  try {
    if (!post_id) return null;
    await prisma.posts.delete({
      where: { id: post_id },
    });
    return post_id ? post_id : null;
  } catch (error) {
    return null;
  }
};
