import Joi from "joi";


export class AdminParcelValidator {
    public getAdminPacelListQueryValidator = Joi.object({
        status: Joi.string().optional(),
        tracking_id: Joi.string().optional(),
        limit: Joi.number().optional(),
        skip: Joi.number().optional(),
    });

    public assignAgentToParcelValidator = Joi.object({
        parcel_id: Joi.number().required(),
        agent_id: Joi.number().required(),
    });

    public changeParcelStatusValidator = Joi.object({
        parcel_id: Joi.number().required(),
        status: Joi.string().required(),
    });
}