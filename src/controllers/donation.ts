import { prisma } from "../../lib/prisma";
import {
  transporter,
  emailer,
} from "../../config/nodemailer";

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
    if(!id) return null
    const findDonationById = await prisma.donations.findUnique({
      where: { id: id },
    });
    return findDonationById ? findDonationById : undefined;
  } catch (error) {
    return error
  }
}

export const postDonation =async (body:any)=>{
    try { 
      if(!body) return null

      const createDonation = await prisma.donations.create({
        data:{
          amount: parseFloat(body.amount),
          campaignId: body.campaignId,
          date: body.date,
          orchestraId: body.orchestraId,
          userId: body.userId
        }
      })

      if (createDonation) {
        const takeUser = await prisma.users.findFirst({
          where: {
            id: body.userId,
          },
        });
        const destinationOrchestra = await prisma.orchestras.findFirst({
          where:{
            id: body.orchestraId
          }
        })
        await transporter.sendMail(
          emailer(
            takeUser,
            "Donación realizada",
            `Saludos ${takeUser!.name}, agradecemos sumamente tu colaboración!`,
            `
            Detalles de donación: Monto: $${body.amount} || Estado: Completado || Destinatario: ${destinationOrchestra?.name}
            `
          )
        );
      }

      return createDonation ? createDonation: null
    } catch (error) {
      return error
    }

}

