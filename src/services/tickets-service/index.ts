import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";

async function getTicketTypes() {
  return ticketRepository.findMany();
}

async function getTicketByUserId(userId: number) {
  const { Ticket } = await ticketRepository.findByUserId(userId);
  if (!Ticket || Ticket.length === 0) throw notFoundError();

  return Ticket[0];
}

async function getTicketTypeById(ticketTypeById: number) {
  const ticketType = await ticketRepository.findTicketTypeById(ticketTypeById);
  if (!ticketType) throw notFoundError();

  return ticketType;
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  const { id } = await ticketRepository.createTicket(ticketTypeId, enrollmentId);
  const tickets = await ticketRepository.findById(id);
  return tickets;
}

const paymentsService = {
  getTicketTypes,
  getTicketByUserId,
  getTicketTypeById,
  postTicket,
};

export default paymentsService;
