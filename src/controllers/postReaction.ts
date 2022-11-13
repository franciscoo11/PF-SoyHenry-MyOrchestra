import { prisma } from "../../lib/prisma";

export const allReactionFromPosts = async() => {
    try {
        const allReactionsPosts = await prisma.postUserOnReaction.findMany()
        return allReactionsPosts ? allReactionsPosts : null
    } catch (error) {
        return null
    }
}

export const addReactionToPost = async(query:{id:string}, body:{userId:string, reactionId: string}) => {
    try {
        if(!query || !body) return null
        const isDuplicateReaction = await prisma.postUserOnReaction.findFirst({
            where:{
                userId:body.userId,
                postId:query.id,
                reactionId: body.reactionId
            }
        })
        if(isDuplicateReaction) return null
        const subscribeReaction = await prisma.postUserOnReaction.create({
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

export const deleteReactionToPost = async(query:{id:string}, body:{userId: string, reactionId: string}) => {
    try {
        if(!query || !body) return null
        const unsubscribeReaction = await prisma.postUserOnReaction.delete({
            where:{
                postId_userId_reactionId: {postId: query.id, userId:body.userId, reactionId:body.reactionId}
            }
        })
        return unsubscribeReaction ? unsubscribeReaction : null
    } catch (error) {
        return error
    }
}
