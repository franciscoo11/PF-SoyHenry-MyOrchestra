import { prisma } from "../../lib/prisma";

export const allReactionFromPosts = async() => {
    try {
        const allReactionsPosts = await prisma.post_user_on_reactions.findMany()
        return allReactionsPosts ? allReactionsPosts : null
    } catch (error) {
        return null
    }
}

export const addReactionToPost = async(query:any, body:any) => {
    try {
        if(!query || !body) return null
        const isDuplicateReaction = await prisma.post_user_on_reactions.findFirst({
            where:{
                userId:body.userId,
                postId:query.id,
                reactionId: body.reactionId
            }
        })
        if(isDuplicateReaction) return null
        const subscribeReaction = await prisma.post_user_on_reactions.create({
            data:{
                postId: query.id,
                reactionId: body.reactionId,
                userId: body.userId
            }
        })
        return subscribeReaction ? subscribeReaction : null
    } catch (error) {
        return error
    }
}

export const deleteReactionToPost = async(query:any, body:any) => {
    try {
        if(!query || !body) return null
        const unsubscribeReaction = await prisma.post_user_on_reactions.delete({
            where:{
                postId_userId_reactionId: {postId: query.id, userId:body.userId, reactionId:body.reactionId}
            }
        })
        return unsubscribeReaction ? unsubscribeReaction : null
    } catch (error) {
        return error
    }
}
