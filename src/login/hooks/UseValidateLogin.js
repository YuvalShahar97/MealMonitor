import Joi from 'joi';

const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required()
        .messages({
            'string.empty': 'שם משתמש לא יכול להיות ריק',
            'string.min': 'שם משתמש חייב להכיל לפחות 3 תווים',
            'string.max': 'שם משתמש יכול להכיל עד 30 תווים',
            'string.alphanum': 'שם משתמש יכול להכיל רק אותיות ומספרים'
        }),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z]).{10,30}$')).required()
        .messages({
            'string.empty': 'סיסמה לא יכולה להיות ריקה',
            'string.pattern.base': 'הסיסמה חייבת להיות באורך 10-30 תווים ולכלול לפחות אות גדולה אחת'
        })
});

export const validateLogin = (data) => {
    return loginSchema.validate(data, { abortEarly: false });
};
