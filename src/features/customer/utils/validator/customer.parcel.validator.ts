import Joi from "joi";

export class CustomerParcelValidator {
  public createParcelValidator = Joi.object({
    sender_name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .label("Sender Name"),

    sender_phone: Joi.string().required().label("Sender Phone"),

    pickup_address: Joi.string().trim().required().label("Pickup Address"),

    receiver_name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .label("Receiver Name"),

    receiver_phone: Joi.string().required().label("Receiver Phone"),

    delivery_address: Joi.string().trim().required().label("Delivery Address"),

    parcel_type: Joi.string()
      .valid("documents", "electronics", "fragile", "clothing", "food", "other")
      .required()
      .label("Parcel Type"),

    parcel_weight: Joi.number()
      .positive()
      .precision(2)
      .required()
      .label("Parcel Weight (kg)"),

    parcel_description: Joi.string()
      .max(500)
      .label("Parcel Description")
      .allow(""),

    payment_mode: Joi.string()
      .valid("prepaid", "cod")
      .required()
      .label("Payment Mode"),

    amount: Joi.number().positive().precision(2).optional().label("Amount"),

    is_paid: Joi.boolean().optional().label("Is Paid"),

    delivery_lng: Joi.number().required().label("Delivery Longitude"),

    delivery_lat: Joi.number().required().label("Delivery Latitude"),

    pickup_lng: Joi.number().required().label("Pickup Longitude"),

    pickup_lat: Joi.number().required().label("Pickup Latitude"),
  });

  public getParcelListQueryValidator = Joi.object({
    limit: Joi.number().optional(),
    skip: Joi.number().optional(),
    status: Joi.string().optional(),
    tracking_id: Joi.string().optional(),
  });

  public getSingleParcelValidator = Joi.object({
    id: Joi.number().required(),
  });

  public getSingleParcelByTrackingIdValidator = Joi.object({
    tracking_id: Joi.string().required(),
  });
}
