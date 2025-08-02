import Joi from "joi";

export class AdminUserValidator {
  public updateUserRoleValidator = Joi.object({
    user_id: Joi.number().required(),
    role: Joi.string().required().valid("agent", "customer", "admin"),
  });

  public getAllUserListQueryValidator = Joi.object({
    role: Joi.string().optional(),
    filter: Joi.string().optional().allow(''),
  });
}
