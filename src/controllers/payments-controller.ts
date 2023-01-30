import ticketsService from "@/services/tickets-service";
import paymentsService from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { RequestAuthMiddleware } from "./tickets-controller";
import { paymentProcess } from "@/protocols";

export async function paymentByTicketIdGet(req: RequestAuthMiddleware, res: Response) {
  const { ticketId } = req.query;
  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  const userId = req.userId;
  try {
    await ticketsService.getTicketById(Number(ticketId));
    await ticketsService.getTicketByIdAndUserId(Number(ticketId), Number(userId));
    const payment = await paymentsService.getPaymentByTicketId(Number(ticketId));
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
    console.error(error);
  }
}

export async function paymentProcessPost(req: RequestAuthMiddleware, res: Response) {
  const userId = req.userId;
  const paymentProcessData = req.body as paymentProcess;
  try {
    const ticket = await ticketsService.getTicketById(paymentProcessData.ticketId);
    await ticketsService.getTicketByIdAndUserId(Number(paymentProcessData.ticketId), Number(userId));
    paymentProcessData.value = ticket.TicketType.price;
    paymentProcessData.cardData.number = paymentProcessData.cardData.number.split("").slice(-4).join("");
    const payment = await paymentsService.postPayment(paymentProcessData);
    await ticketsService.updateTicketStatusToPaid(ticket.id);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if (error.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
