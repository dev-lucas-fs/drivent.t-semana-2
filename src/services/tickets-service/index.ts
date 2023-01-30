import { notFoundError, unauthorizedError } from "@/errors";
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

async function getTicketById(ticketId: number) {
  const tickets = await ticketRepository.findById(ticketId);
  if (!tickets) throw notFoundError();

  return tickets;
}

async function postTicket(ticketTypeId: number, enrollmentId: number) {
  const { id } = await ticketRepository.createTicket(ticketTypeId, enrollmentId);
  const tickets = await ticketRepository.findById(id);
  return tickets;
}

async function getTicketByIdAndUserId(ticketId: number, userId: number) {
  const tickets = await ticketRepository.findTicketByIdAndUserId(ticketId, userId);
  if (!tickets) throw unauthorizedError();
  return tickets;
}

async function updateTicketStatusToPaid(ticketId: number) {
  return await ticketRepository.updateTicketStatusToPaid(ticketId);
}

const ticketsService = {
  getTicketTypes,
  getTicketByUserId,
  getTicketTypeById,
  postTicket,
  getTicketById,
  getTicketByIdAndUserId,
  updateTicketStatusToPaid,
};

export default ticketsService;
