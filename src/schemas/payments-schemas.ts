import Joi from "joi";

export const ticketId = Joi.object({
  ticketId: Joi.number().integer().required(),
});

export const paymentProcessSchema = Joi.object({
  ticketId: Joi.number().required().integer(),
  cardData: Joi.object().required(),
});
