import { Router } from "express";

import { getTicketTypes, getTicket, postCreateTicket } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicket } from "@/schemas/tickets-schemas";

const ticketsRouter = Router();

ticketsRouter.get("/types", authenticateToken, getTicketTypes);
ticketsRouter.get("/", authenticateToken, getTicket);
ticketsRouter.post("/", authenticateToken, validateBody(createTicket), postCreateTicket);

export { ticketsRouter };
