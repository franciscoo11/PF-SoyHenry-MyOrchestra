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
        const findDuplicate = await prisma.reaction.findFirst({
            where: {
                reaction: reaction
            }
        })
        if(findDuplicate) return null
        const generateReaction = await prisma.reaction.create({
            data: {
                reaction
            }
        })
        return generateReaction ? generateReaction : null
    } catch (error) {
        return error
    }
}

interface query {
    id?:string
    reaction?: string
}

export const updateReaction = async(query:query, body:{reaction:string}) => {
    try {
        if(!query.id) return null
        const modifyReaction = await prisma.reaction.update({
            where: {
                id: query.id
            },
            data:{
                reaction:body.reaction
            }
        })
        return modifyReaction ? modifyReaction : null
    } catch (error) {
        return error
    }
}