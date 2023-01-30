import { Router } from "express";

import { createUserSchema, paymentProcessSchema, ticketId } from "@/schemas";
import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { paymentByTicketIdGet, paymentProcessPost } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter.get("/", authenticateToken, paymentByTicketIdGet);
paymentsRouter.post("/process", authenticateToken, validateBody(paymentProcessSchema), paymentProcessPost);

export { paymentsRouter };
