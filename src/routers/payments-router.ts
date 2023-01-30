import { Router } from "express";

import { createUserSchema, ticketId } from "@/schemas";
import { validateBody, validateParams } from "@/middlewares";
import { paymentByTicketIdGet } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter.get("/payments", validateParams(ticketId), paymentByTicketIdGet);

export { paymentsRouter };
