import { prisma } from "../../lib/prisma";

export const getDonations = async (orchestra_id: any, user_id: any) => {
  try {
    if (!orchestra_id && !user_id) {
      const allDonations = await prisma.donation.findMany();
      return allDonations.length ? allDonations : null;
    }

    if (!orchestra_id && user_id) {
      const userDonations = await prisma.donation.findMany({
        where: {
          userId: user_id,
        },
      });
      return userDonations.length ? userDonations : null;
    }

    if (orchestra_id && !user_id) {
      const orchestraDonations = await prisma.donation.findMany({
        where: {
          orchestraId: orchestra_id,
        },
      });
      return orchestraDonations.length ? orchestraDonations : null;
    }

    if (orchestra_id && user_id) {
      const userDonationsInAnOrchestra = await prisma.donation.findMany({
        where: {
          orchestraId: orchestra_id,
          userId: user_id,
        },
      });
      return userDonationsInAnOrchestra.length
        ? userDonationsInAnOrchestra
        : null;
    }
  } catch (error) {
    return null
  }
};

export const postDonation =async (body:any)=>{
    try {
      const {userId,orchestraId,amount}=body;
    const createDonation = await prisma.donation.create({
    data:body
    })
    return createDonation?createDonation: null
    } catch (error) {
        return error
    }

}

