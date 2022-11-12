import { prisma } from "../../lib/prisma";
//usar el id del usuario del que se desea ver los favoritos por query
export const getFavorites = async (user_id: any) => {
  try {
    if (!user_id) return null;
    const searchFavorites = await prisma.favorites.findMany({
      where: {
        userId: user_id,
      },
      select: {
        orchestra_id: true,
      },
    });
    return searchFavorites ? searchFavorites : null;
  } catch (error) {
    return null;
  }
};

//en la tabla favoritos hay un favorites Id para cada usuario, esta se envia por query
//orchestra_id se debera enviar el id de la orchestra a la que se quiere poner el favorito, esta se envia por body
export const putFavoritesAdd = async (favoritesId: any, orchestra_id: any) => {
  try {
    if (!favoritesId || !orchestra_id) return null;
    const addFavorites = await prisma.favorites.update({
      where: {
        favorites_id: favoritesId,
      },
      data: {
        orchestra_id: {
          connect: [{ id: orchestra_id }],
        },
      },
    });
    return addFavorites ? addFavorites : null;
  } catch (error) {
    return null;
  }
};

//en la tabla favoritos hay un favorites Id para cada usuario, esta se envia por query
////orchestra_id se debera enviar el id de la orchestra a la que se quiere poner el favorito, esta se envia por body
export const putFavoritesDelete = async (favorites_id: any, orchestra_id: any) => {
  try {
    if (!favorites_id || !orchestra_id) return null;
    const deletedFavorite =await prisma.favorites.update({
      where: { favorites_id: favorites_id },
      data: {
        orchestra_id: {
          disconnect: [{ id: orchestra_id }],
        },
      },
    });
    return deletedFavorite ? deletedFavorite : null;
  } catch (error) {
    return null;
  }
};

// export const postFavorites = async (favorites_id:any,userId:any)=>{
//   try {
//    const jeje= await prisma.favorites.create({
//     data:{
//       user_id: {
//         connect: [{ id: userId }],
//       }
//     }
//     })
//     return jeje
    
//   } catch (error) {
    
//   }
// }


// export const postFavorites = async (favorites_id:any,userId:any)=>{
//   try {
//    const jeje= await prisma.user.create({
//     data:{
//       connectOrCreate: {
//         where: {
//             favorites_id
//         },
//         create: {
//           favorites_id
//         },
//       }
      
//     },
//     include: {
//       author: true,
//     },
//   })
//     return jeje
    
//   } catch (error) {
    
//   }
// }





//este codigo esta lleno de lagrimas de sangre tratalo con amor 