import { body, param } from "express-validator";

export const createOrderValidation = [
  body('userId')
    .isNumeric().withMessage('User ID harus angka')
    .custom(value => value > 0).withMessage('User ID harus lebih dari 0')
    .toInt(),
  
  body('total')
    .isDecimal().withMessage('Total harus berupa angka desimal')
    .custom(value => {
      const num = parseFloat(value);
      return num >= 0;
    }).withMessage('Total tidak boleh negatif')
    .customSanitizer(value => parseFloat(value)),
];

export const getOrderByIdValidation = [
  param('id')
    .isNumeric().withMessage('ID harus angka')
    .custom(value => value > 0).withMessage('ID harus lebih dari 0')
    .toInt(),
];