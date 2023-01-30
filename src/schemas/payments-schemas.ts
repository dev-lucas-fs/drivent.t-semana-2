import Joi from "joi";

export const ticketId = Joi.object({
  ticketId: Joi.number().integer(),
});
