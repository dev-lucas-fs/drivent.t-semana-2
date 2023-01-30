import enrollmentsService from "@/services/enrollments-service";
import ticketService from "@/services/tickets-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

type RequestAuthMiddleware = Request & { userId: number };

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const types = await ticketService.getTicketTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTicket(req: RequestAuthMiddleware, res: Response) {
  const userId = req.userId;
  if (!userId) return res.sendStatus(httpStatus.NOT_FOUND);

  try {
    await enrollmentsService.getOneWithAddressByUserId(userId);
    const ticket = await ticketService.getTicketByUserId(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postCreateTicket(req: RequestAuthMiddleware, res: Response) {
  const { ticketTypeId } = req.body;
  const userId = req.userId;
  try {
    await ticketService.getTicketTypeById(Number(ticketTypeId));
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    const newTicket = await ticketService.postTicket(ticketTypeId, enrollment.id);
    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
