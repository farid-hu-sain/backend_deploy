import { body, param, } from "express-validator";
export const createUserValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama user wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama user minimal 3 karakter'),
    body('email')
        .trim()
        .notEmpty().withMessage('email wajib diisi'),
    body('password_hash')
        .isNumeric().withMessage('Password harus angka')
        .custom(value => value > 8).withMessage('Password harus lebih dari 8'),
];
export const getUserByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=user.validation.js.map