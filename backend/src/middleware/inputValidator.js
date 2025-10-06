import Joi from "joi";

const employeeSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(3).required(),
});

const validateEmployee = (req, res, next) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export default validateEmployee;
