import {prisma} from '../../lib/prisma'


export const getCommentPost = async () => {
    try {
      const getComment = await prisma.comment.findMany();
      return getComment;   
    } catch (error) {
      return error
    }
};

export const postCommentPost = async(body:any)=>{
    try {
        const {content} = body;
        if(!content) return 'missing values'
        const postComment = await prisma.comment.create({
          data:body
        });
        return postComment ? postComment : null
    } catch (error) {
        return error
    }
}

export const logicDeleteComment = async (id:any) => {
    const deactivate = await prisma.comment.update({
      where:{ id:id }, data: { is_active: false } })
    return deactivate ? deactivate : null
  }

export const deleteComment = async (id: any) => {
    try {
      if (!id) return null;
      const deleted = await prisma.comment.delete({
        where: { id: id },
      });
      return deleted ? deleted : null
    } catch (error) {
      return error;
    }
};  
