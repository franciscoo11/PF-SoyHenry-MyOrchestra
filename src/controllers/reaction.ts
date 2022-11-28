import { prisma } from "../../lib/prisma";

export const getAllReactions = async(query:any) => {
    try {
        const {id_reaction}=query
        if(id_reaction){

            const reactions = await prisma.reactions.findMany({

                where:{
                    id:id_reaction
                }
            })
            return reactions?reactions:null
        }
        const allReactions = await prisma.reactions.findMany()
        return allReactions.length ? allReactions : null
    } catch (error) {
        return error
    }
}

export const addReaction = async(reaction:any) => {
    try {
        if(!reaction) return null
        const isDuplicate = await prisma.reactions.findFirst({
            where:{
                reaction:reaction
            }
        })
        if(isDuplicate) return null
        const addReaction = await prisma.reactions.create({
            data:{
                reaction:reaction
            }
        })
        return addReaction ? addReaction : null
    } catch (error) {
        return error
    }
}
