import { prisma } from "@/config";

function findById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

function findByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId,
    },
    select: {
      Ticket: {
        select: {
          id: true,
          status: true,
          ticketTypeId: true,
          enrollmentId: true,
          TicketType: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

function findMany() {
  return prisma.ticketType.findMany();
}

function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findFirst({
    where: {
      id: ticketTypeId,
    },
  });
}

function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId,
      status: "RESERVED",
    },
  });
}

async function findTicketByIdAndUserId(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
      Enrollment: {
        userId: userId,
      },
    },
  });
}

function updateTicketStatusToPaid(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: "PAID",
    },
  });
}

const ticketRepository = {
  findById,
  findMany,
  findByUserId,
  findTicketTypeById,
  createTicket,
  findTicketByIdAndUserId,
  updateTicketStatusToPaid,
};

export default ticketRepository;
