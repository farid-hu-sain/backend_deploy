import { body, param } from "express-validator";
export const createOrderItemsValidation = [
    body('orderid')
        .isNumeric().withMessage('Order ID harus angka')
        .custom(value => value > 0).withMessage('Order ID harus lebih dari 0')
        .toInt(),
    body('productId')
        .isNumeric().withMessage('Product ID harus angka')
        .custom(value => value > 0).withMessage('Product ID harus lebih dari 0')
        .toInt(),
    body('quantity')
        .isNumeric().withMessage('Quantity harus angka')
        .custom(value => value > 0).withMessage('Quantity harus lebih dari 0')
        .toInt(),
];
export const getOrderItemsByIdValidation = [
    param('id')
        .isNumeric().withMessage('ID harus angka')
        .custom(value => value > 0).withMessage('ID harus lebih dari 0')
        .toInt(),
];
//# sourceMappingURL=orderItems.validation.js.map