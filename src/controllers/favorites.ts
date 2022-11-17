import { prisma } from "../../lib/prisma";

export const getFavorites = async (user_id: any) => {
  try {
    if(!user_id){
      const allFavorites = await prisma.favorites.findMany()
      return allFavorites.length ? allFavorites : null;
    }

    const findFavoriteById = await prisma.user.findUnique({
      where:{
        id: user_id
      },
      include:{
        favorites:true
      }
    })
    return findFavoriteById ? findFavoriteById : null
  } catch (error) {
    return error
  }
};


export const addFavorite = async (user_id: any, orchestra_id: any) => {
  try {
    if (!user_id || !orchestra_id) return null;
    const addFavorites = await prisma.user.update({
     where:{
      id: user_id
     },
     data:{
      favorites:{
        create:[{orchestraId:orchestra_id}]
      }
     }
    })
    console.log(addFavorites)
    return addFavorites ? addFavorites : null;
  } catch (error) {
    return error
  }
};

export const removeFavorite = async (user_id: any, orchestra_id: any) => {
  try {
    if (!user_id || !orchestra_id) return null;
    const removeFavorite = await prisma.user.update({
      where:{
       id: user_id
      },
      data:{
       favorites:{
         delete:{
          userId_orchestraId: { orchestraId: orchestra_id, userId: user_id}
         }
       }
      }
     })
     console.log(removeFavorite)
    return removeFavorite ? removeFavorite : null;
  } catch (error) {
    return error
  }
};