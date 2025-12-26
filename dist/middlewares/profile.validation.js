import { body, param, } from "express-validator";
export const createProfileValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama user wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama user minimal 3 karakter'),
    body('gender')
        .trim()
        .notEmpty().withMessage('asal wajib diisi'),
    body('address')
        .trim()
        .notEmpty().withMessage('alamat wajib diisi'),
    body('userId')
        .isNumeric().withMessage('Id user harus angka')
        .custom(value => value > 8).withMessage('Id user harus lebih dari 8'),
];
export const getProfileByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=profile.validation.js.map