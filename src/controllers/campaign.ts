import { prisma } from "../../lib/prisma";

export const getCampaigns = async (id?:any) => {
    try {
        if(!id){
            const allCampaigns = await prisma.campaign.findMany()
            return allCampaigns.length ? allCampaigns : null
        }
        const searchCampaignById = await prisma.campaign.findUnique({
            where: {
                id: id
            }
        })
        return searchCampaignById ? searchCampaignById : null
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