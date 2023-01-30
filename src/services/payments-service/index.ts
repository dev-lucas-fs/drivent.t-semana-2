import { paymentProcess } from "@/protocols";
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

async function postPayment(paymentProcess: paymentProcess) {
  const payment = await paymentRepository.createPayment(paymentProcess);
  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  postPayment,
};

export default paymentsService;
