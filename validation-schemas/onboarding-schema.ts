import Joi from "joi";

export const registerSchema = Joi.object({
    first_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
    last_name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
    password: Joi.string(),
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    token: Joi.string(),
  
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})


export const loginSchema = Joi.object({
  
    password: Joi.string(),
        // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})