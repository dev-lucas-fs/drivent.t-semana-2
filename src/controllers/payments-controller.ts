import paymentsService from "@/services/payments-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function paymentByTicketIdGet(req: Request, res: Response) {
  const { ticketId } = req.query;
  try {
    return res.status(200).send(paymentsService.getPaymentByTicketId(Number(ticketId)));
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
