import { prisma } from "@/config";
import { paymentProcess } from "@/protocols";

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(paymentProcess: paymentProcess) {
  return prisma.payment.create({
    data: {
      ticketId: paymentProcess.ticketId,
      cardIssuer: paymentProcess.cardData.issuer,
      cardLastDigits: String(paymentProcess.cardData.number),
      value: paymentProcess.value,
    },
  });
}

const paymentRepository = {
  findByTicketId,
  createPayment,
};

export default paymentRepository;
