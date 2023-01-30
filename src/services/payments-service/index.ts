import { notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function getPaymentByTicketId(ticketId: number) {
  const ticket = await ticketRepository.findById(ticketId);
  if (!ticket) throw notFoundError();
  const payment = await paymentRepository.findByTicketId(ticketId);
  if (!payment) throw notFoundError();
  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
};

export default paymentsService;
