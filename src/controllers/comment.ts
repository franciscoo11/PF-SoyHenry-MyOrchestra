import {prisma} from '../../lib/prisma'


export const getCommentPost = async (query:any) => {
    try {
      const {postId} = query
      if(postId){
      const getCommentByPost = await prisma.comments.findMany({
        orderBy: { creation_date: 'desc' },
        where:{
          postId:postId
        }
      });
      return getCommentByPost ? getCommentByPost : null 
      }
      const getComment = await prisma.comments.findMany({orderBy:{creation_date:'desc'}});
      return getComment;   
    } catch (error) {
      return error
    }
};

export const postCommentPost = async(body:any)=>{
    try {
        const {content} = body;
        if(!content) return 'missing values'
        const postComment = await prisma.comments.create({
          data:body
        });
        return postComment ? postComment : null
    } catch (error) {
        return error
    }
}

export const logicDeleteComment = async (id:any) => {
    const deactivate = await prisma.comments.update({
      where:{ id:id }, data: { is_active: false } })
    return deactivate ? deactivate : null
  }

export const deleteComment = async (id: any) => {
    try {
      if (!id) return null;
      const deleted = await prisma.comments.delete({
        where: { id: id },
      });
      return deleted ? deleted : null
    } catch (error) {
      return error;
    }
};  
