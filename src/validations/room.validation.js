const Joi = require("joi");

exports.validateRoomBooking = async(req, res, next)=>{
    const bookingSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
        checkIn: Joi.date().iso().required(),
        checkOut: Joi.date().iso().greater(Joi.ref("checkIn")).required()
    });
    const { error } = bookingSchema.validate(req.body);
    if(error){
        return error
    }
    return;
}