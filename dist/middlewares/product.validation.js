import { body, param, } from "express-validator";
export const createProductValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Nama Produk wajib diisi')
        .isLength({ min: 3 }).withMessage('Nama produk minimal 3 karakter'),
    body('description')
        .trim()
        .notEmpty().withMessage('asal wajib diisi'),
    body('price')
        .isNumeric().withMessage('Harga harus angka')
        .custom(value => value > 0).withMessage('Harga harus lebih dari 0')
        .toInt(),
    body('stock')
        .isNumeric().withMessage('stok harus angka')
        .custom(value => value > 0).withMessage('stok harus lebih dari 0'),
    body('categoryId')
        .isNumeric().withMessage('ID kategori harus angka').toInt()
        .custom(value => value > 0).withMessage('ID kategori harus lebih dari 1')
];
export const getProductByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
];
//# sourceMappingURL=product.validation.js.map