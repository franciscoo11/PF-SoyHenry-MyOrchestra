import { prisma } from "../../lib/prisma";

export const getCampaigns = async (query?:any) => {
    const { title, goal_amount, id,resources,page,order }= query
    const results= (await prisma.campaigns.findMany()).length

    const onlyorder =async(orderprop:any,order:any)=>{
        const data= await prisma.campaigns.findMany( 
          { orderBy: { [orderprop]: order },
          include: {donations: true},
          take: resources*1 ||4,
          skip: page*resources||page*4||0,
          })
          return {results,data}
      }

      const dataonly =async(prop1:any,date1:any)=>{
        let trimedName = date1.toLowerCase().trim();
        let aux=date1;
        if(prop1!="id"){
           aux = { contains: trimedName, mode:'insensitive' }
        }
        const data= await prisma.campaigns.findMany( 
          {
          take: resources*1 ||4,
          skip: page*resources||page*4||0,
            where:{      
              [prop1]:aux 
            },
            include:{
                donations:true,
                orchestra:true
            }
          })

        const results= (await prisma.campaigns.findMany( 
            {
              where:{      
                [prop1]:aux 
              },
              include:{
                  donations:true
              }
            })).length
          return {results,data}
      }

      if(order) return onlyorder("title",order)
      if(goal_amount) return onlyorder("goal_amount",goal_amount)

      if(title)return dataonly ("title",title)
      if(id)return dataonly ("id",id)

      const data = await prisma.campaigns.findMany({
        take: resources*1 ||4,
        skip: page*resources||page*4||0,}
        )
      return {results,data}
}


export const updateCampaign = async (id:any, body:any) => {
    try {
        if(!id) return null
        const changeCampaign = await prisma.campaigns.update({ 
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
        const generateCampaign = await prisma.campaigns.create({
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
        const disableCampaign = await prisma.campaigns.update({
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
        const removeCampaign = await prisma.campaigns.delete({
            where: {
                id:id
            }
        })
        return removeCampaign ? removeCampaign : null
    } catch (error) {
        return error
    }
}