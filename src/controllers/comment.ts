import {prisma} from '../../lib/prisma'


export const getCommentPost = async () => {
    try {
      const getComment = await prisma.comment.findMany();
      return getComment;   
    } catch (error) {
      console.log('error: ', error)
    }
};

export const postCommentPost = async(body:any)=>{
    try {
        const {content} = body;
        if(!content) return 'missing values'
        const postComment = await prisma.comment.create({
          data:body
        });
        return postComment
    } catch (error) {
        console.log(`error: `, error)
    }
}

export const logicDeleteComment = async (id:any) => {
    const deactivate = await prisma.comment.update({
      where:{ id:id }, data: { is_active: false } })
    return deactivate
  }