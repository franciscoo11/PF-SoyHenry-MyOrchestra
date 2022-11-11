import { prisma } from "../../lib/prisma";
//GET USERSPOST
export const getUsersPost = async () => {
  try {
    const getPosts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
      },
    });

    return getPosts ? getPosts : null;
  } catch (error) {
    console.log("something was wrong in get ", error);
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
//poner un 0 antes del numero en caso de ser inferior a 10, ejemplo: 05/12/23
//formato mm/dd/yyyy(12/03/22) o (09/30/2022)

//requerimientos a la hora de escribir la hora:
//si no tiene coherencia salta error
//incluir am o pm
//formato 2:05 pm
export const postUsersPost = async (body: any) => {
  try {
    //estos datos son obligatorios por ahora mientras se termina de definir cuales van a ser los obligatorios en el modelo post
    const { event_date, event_hour, title, content } = body;
    if (!title || !content) return null;
    if (verifyDate(event_date) === false) return null;
    if (verifyHour(event_hour) === false) return null;
    await prisma.post.create({
      data: body,
    });
    return body ? body : null;
  } catch (error) {
    console.log(`something was wrong in post, values received:${body} `, error);
  }
};

//PUT USERSPOST
export const putUsersPost = async (post_id: any, body: any) => {
  try {
    if (!post_id || !body) return null;
    await prisma.post.update({
      where: {
        id: post_id,
      },
      data: body,
    });
    return body ? body : null;
  } catch (error) {
    return console.log(
      error,
      ` cant update, values received:${post_id}, ${body}`
    );
  }
};

//DELETE USERSPOST

export const logicDeleteUsersPost = async (post_id: any) => {
  try {
    if (!post_id) return null;
    await prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        is_active: false,
      },
    });
    return post_id ? post_id : null;
  } catch (error) {
    return console.log(error, ` cant logic delete, value received:${post_id}`);
  }
};

export const deleteUsersPost = async (post_id: any) => {
  try {
    if (!post_id) return null;
    await prisma.post.delete({
      where: { id: post_id },
    });
    return post_id ? post_id : null;
  } catch (error) {
    return console.log(error, ` cant delete, value received:${post_id}`);
  }
};
