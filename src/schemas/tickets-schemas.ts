import Joi from "joi";

export const createTicket = Joi.object({
  ticketTypeId: Joi.number().required(),
});
