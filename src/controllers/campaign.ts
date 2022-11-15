import { prisma } from "../../lib/prisma";

export const getCampaigns = async (query?:any) => {
    const { title, goal_amount, id }= query
    try {
        if(title){
            const az = await prisma.campaign.findMany({orderBy:{title: 'asc'}})
            const za = await prisma.campaign.findMany({orderBy:{title: 'desc'}})
            if(title === 'asc') return az
            if(title === 'desc') return za
            const trimedTitle = title.toLowerCase().trim()
            const foundName = await prisma.campaign.findMany({
                where: { title: { contains: trimedTitle, mode:'insensitive' } } })
                return foundName.length ? foundName : null
        }
        if(goal_amount){
            const asc = await prisma.campaign.findMany({orderBy:{goal_amount: 'asc'}})
            const desc = await prisma.campaign.findMany({orderBy:{goal_amount: 'desc'}})
            return goal_amount === 'asc' ? asc : desc
        }
        if(id){
        const searchCampaignById = await prisma.campaign.findUnique({
            where: { id: id } })
        return searchCampaignById ? searchCampaignById : null
        }
        const allCampaigns = await prisma.campaign.findMany()
        return allCampaigns.length ? allCampaigns : null
    } catch (error) {
        return error
    }
}


export const updateCampaign = async (id:any, body:any) => {
    try {
        if(!id) return null
        const changeCampaign = await prisma.campaign.update({ 
            where: {
                id: id
            },
            data: body
        })
        return changeCampaign ? changeCampaign : null
    } catch (error) {
        return error
    }
}

export const addCampaign = async (body:any) => {
    try {
        const { title , goal_amount } = body
        if(!title || !goal_amount) return null
        const generateCampaign = await prisma.campaign.create({
            data: {
                ...body,
                title: title,
                goal_amount: goal_amount
            }
        })
        return generateCampaign ? generateCampaign : null
    } catch (error) {
        return error
    }
}

export const logicDeleteCampaign = async (id:any) => {
    try {
        if(!id) return null
        const disableCampaign = await prisma.campaign.update({
            where: {
                id: id
            },
            data: {
                is_active: false
            }
        })
        return disableCampaign ? disableCampaign : null
    } catch (error) {
        return error
    }
}

export const deleteCampaign = async (id:any) => {
    try {
        if(!id) null
        const removeCampaign = await prisma.campaign.delete({
            where: {
                id:id
            }
        })
        return removeCampaign ? removeCampaign : null
    } catch (error) {
        return error
    }
}