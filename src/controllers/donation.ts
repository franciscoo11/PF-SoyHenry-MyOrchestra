import { prisma } from "../../lib/prisma";

export const getDonations = async (query:any) => {
  const {orchestraId, userId} = query
  try {
    if (!orchestraId && !userId) {
      const allDonations = await prisma.donations.findMany();
      return allDonations.length ? allDonations : null;
    }

    if (!orchestraId && userId) {
      const userDonations = await prisma.donations.findMany({
        where: {
          userId: userId,
        },
      });
      return userDonations.length ? userDonations : null;
    }

    if (orchestraId && !userId) {
      const orchestraDonations = await prisma.donations.findMany({
        where: {
          orchestraId: orchestraId,
        },
      });
      return orchestraDonations.length ? orchestraDonations : null;
    }

    if (orchestraId && userId) {
      const userDonationsInAnOrchestra = await prisma.donations.findMany({
        where: {
          orchestraId: orchestraId,
          userId: userId,
        },
      });
      return userDonationsInAnOrchestra.length
        ? userDonationsInAnOrchestra
        : null;
    }
  } catch (error) {
    return error
  }
};

export const getDonationsById = async (id:any) => {
  try {
    const donation = await prisma.donations.findUnique({
      where: { id: id },
    });
    return donation ? donation : undefined;
  } catch (error) {
    return error
  }
}

export const postDonation =async (body:any)=>{
    try {
      const {userId,orchestraId,amount}=body;
    const createDonation = await prisma.donations.create({
    data:body
    })
    return createDonation?createDonation: null
    } catch (error) {
        return error
    }

}

