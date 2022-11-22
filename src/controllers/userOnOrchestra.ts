import { prisma } from '../../lib/prisma';

export const getAllUserOnOrchestras = async() => {
    try {
        const allUsersOnOrchestras = await prisma.users_on_orchestra.findMany()
        return allUsersOnOrchestras.length ? allUsersOnOrchestras : null
    } catch (error) {
        return error
    }
}

export const sendMembership = async(query: any, body:any) => {
    try {
        if(!query || !body) return null;
        const sendRequestMember = await prisma.users_on_orchestra.create({
            data:{
                orchestraId: query.orchestraId,
                rolId: body.rolId,
                userId: body.userId,
            }
        });

        return sendRequestMember ? sendRequestMember : null

    } catch (error) {
        return error
    }
}

export const unsubscribeMembership = async(query:any,body:any) => {
    try {
        if(!query || !body) return null
        const eliminateMembership = await prisma.users_on_orchestra.delete({
            where:{
                userId_orchestraId_rolId:{
                    orchestraId: query.orchestraId,
                    rolId: body.rolId,
                    userId: body.userId,
                }
            }
        })
        return eliminateMembership ? eliminateMembership : null

    } catch (error) {
        return error
    }
}

// UPDATE MEMBER