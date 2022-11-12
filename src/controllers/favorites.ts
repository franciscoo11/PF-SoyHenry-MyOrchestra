import { prisma } from "../../lib/prisma";

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

export const postFavorites = async (favoritesId: any, orchestra_id: any) => {
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

export const deleteFavorites = async (favorites_id: any, name: any) => {
  try {
    if (!favorites_id || !name) return null;
    const deletedFavorite =await prisma.favorites.update({
      where: { favorites_id: favorites_id },
      data: {
        orchestra_id: {
          disconnect: [{ name: name }],
        },
      },
    });
    return deletedFavorite ? deletedFavorite : null;
  } catch (error) {
    return null;
  }
};
//este codigo esta lleno de lagrimas de sangre tratalo con amor 