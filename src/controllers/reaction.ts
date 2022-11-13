import { prisma } from "../../lib/prisma";

export const getAllReactions = async() => {
    try {
        const allReactions = await prisma.reaction.findMany()
        return allReactions.length ? allReactions : null
    } catch (error) {
        return error
    }
}

export const addReaction = async(reaction:string) => {
    try {
        if(!reaction) return null
        const isDuplicate = await prisma.reaction.findFirst({
            where:{
                reaction:reaction
            }
        })
        if(isDuplicate) return null
        const addReaction = await prisma.reaction.create({
            data:{
                reaction:reaction
            }
        })
        return addReaction ? addReaction : null
    } catch (error) {
        return error
    }
}
