import type { NextApiRequest, NextApiResponse } from "next";
import { getFavorites, putFavoritesAdd, putFavoritesDelete,  } from '../../../controllers/favorites';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      const GET:string="GET";
      const PUT:string="PUT";
      const PATCH:string="PATCH";
  
  
      let {
        method,
        body:{orchestra_id},
        query:{favorites_id, email},
      } = req;
  
      try {
        switch (method) {
            case GET:
              const allOrchestras = await getFavorites(email);
             return allOrchestras?  res.status(200).json(allOrchestras) : res.status(404).json({error: 'Something goes wrong, check id and try again'});
            case PUT:
                const addToFavorites = await putFavoritesAdd(favorites_id, orchestra_id)
                return addToFavorites? res.status(200).json(addToFavorites) : res.status(404).json({error: 'Something goes wrong, check id and try again'})
            case PATCH:
                const deleteToFavorites = await putFavoritesDelete(favorites_id, orchestra_id);
                return deleteToFavorites? res.status(200).json(deleteToFavorites) : res.status(404).json({error:'Something goes wrong, check id and try again'})
            default:
            return res.status(400).json("method no found")
              
        }
    } catch (error) {
      return  res.status(400).json({error : "Internal error, something goes really really wrong"})
    }

}