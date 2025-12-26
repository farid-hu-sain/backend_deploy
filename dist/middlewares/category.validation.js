import { body, param, } from "express-validator";
export const createCategoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama user wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama user minimal 3 karakter')
];
export const getCategoryByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=category.validation.js.map