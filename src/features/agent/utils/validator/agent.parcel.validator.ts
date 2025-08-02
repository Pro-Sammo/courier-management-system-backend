import Joi from "joi";

export class AgentParcelValidator {
  public updateParcelStatusValidator = Joi.object({
    status: Joi.string()
      .required()
      .valid("PICKED UP", "IN TRANSIT", "DELIVERED", "FAILED"),
    agent_note: Joi.string().optional().allow("", null),
  });

  public updateParcelStatusParamValidator = Joi.object({
    id: Joi.number().required(),
  });
}
