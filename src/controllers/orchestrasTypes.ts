import { prisma } from "../../lib/prisma"

export const getOrchestrasTypes = async (id?:any) => {
    try {
        if(!id) {
            const allOrchestras = await prisma.orchestra_Type.findMany()
            return allOrchestras.length ? allOrchestras : null
        }
        const findOrchestraById = await prisma.orchestra_Type.findUnique({
            where: {
                id: id
            }
        })
        return findOrchestraById ? findOrchestraById : null
    } catch (error) {
        return error
    }
}

export const addOrchestraType = async (body:any) => {
    try {
        const { type } = body
        const checkOrchestraTypeDuplicate = await prisma.orchestra_Type.findFirst({
            where: {
                type: type
            }
        })
        if(checkOrchestraTypeDuplicate) return null
        if(!type) return null
        const generateOrchestraType = await prisma.orchestra_Type.create({
            data: body
        })
        return generateOrchestraType ? generateOrchestraType : null
    } catch (error) {
        return error
    }
}

export const updateOrchestraType = async (id:any, body:any) => {
    try {
        if(!id) return null
        const changeOrchestraType = await prisma.orchestra_Type.update({
            where: {
                id: id
            },
            data: body
        })
        return changeOrchestraType ? changeOrchestraType : null
    } catch (error) {
        return error
    }
}
