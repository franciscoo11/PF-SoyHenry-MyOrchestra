import { prisma } from "../../lib/prisma";

export const getCampaigns = async (query?:any) => {
    const { title, goal_amount, id,resources,page,order }= query

    const onlyorder =async(orderprop:any,order:any)=>{
        const datos= await prisma.campaign.findMany( 
          { orderBy: { [orderprop]: order },
          take: resources*1 ||4,
          skip: page*resources||page*4||0,
          })
          return datos
      }

      const dataonly =async(prop1:any,date1:any)=>{
        let trimedName = date1.toLowerCase().trim();
        let aux=date1;
        if(prop1!="id"){
           aux = { contains: trimedName, mode:'insensitive' }
        }
        const datos= await prisma.campaign.findMany( 
          {
          take: resources*1 ||4,
          skip: page*resources||page*4||0,
            where:{      
              [prop1]:aux 
            }
          })
          return datos
      }

      if(order) return onlyorder("title",order)
      if(goal_amount) return onlyorder("goal_amount",goal_amount)

      if(title)return dataonly ("title",title)
      if(id)return dataonly ("id",id)

      return await prisma.campaign.findMany({
        take: resources*1 ||4,
        skip: page*resources||page*4||0,}
        )
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