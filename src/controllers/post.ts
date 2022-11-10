import { prisma } from "../../lib/prisma";
//GET USERSPOST
export const getUsersPost = async () => {
    try {
      const getUsersPostModel = await prisma.post.findMany({
        select: {
          title: true,
          content: true,
        },
      });
    
      return getUsersPostModel;
      
    } catch (error) {
      console.log('something was wrong in get ',error)
    }
   
  };

//POST USERSPOST
export const postUsersPost = async(body:any)=>{
    try {
        const {title,content} = body;
        if(!title || !content ) throw ('missing values')
        const userPostModel = await prisma.post.create({
          data:body
        });
        return userPostModel
    } catch (error) {
        console.log(`something was wrong in post, values received:${body} `, error)
    }

}

//PUT USERSPOST
export const putUsersPost = async(post_id:any ,body:any) => {
    try {
        const updateUserPosts = await prisma.post.update({
            where: {
                id:post_id,
            },
            data:body


            }
        )
        return updateUserPosts
        
    } catch (error) {
        return console.log(error,` cant update, values received:${post_id}, ${body}`)
    }
}

//DELETE USERSPOST
export const deleteUsersPost = async (post_id:any) => {

    const orchestraDelete = await prisma.post.delete({
      where: {id:post_id},
    });
    return orchestraDelete;
    
  
};