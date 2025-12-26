import { Router } from "express";
import { OrderItemsController } from "../controllers/orderItems.controller.js";
import { validate } from "../utils/validator.js";
import { createOrderItemsValidation, getOrderItemsByIdValidation } from "../middlewares/orderItems.validation.js";
import { OrderItemsRepository } from "../repository/orderItems.repository.js";
import { OrderItemsService } from "../services/orderItems.service.js";
import prismaIntance from "../database.js";
const repo = new OrderItemsRepository(prismaIntance);
const service = new OrderItemsService(repo);
const controller = new OrderItemsController(service);
const router = Router();
/**
 * @swagger
 * tags:
 *  name: OrderItems
 *  description: Manajemen orderItems pengguna
 */
/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: mengambil semua orderItems
 *     tags: [OrderItems]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/", controller.getAllOrderItemsHandler);
/**
 * @swagger
 * /orderItems/stats:
 *   get:
 *     summary: menyortir bagian orderItems
 *     tags: [OrderItems]
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/stats", controller.getstats);
/**
 * @swagger
 * /orderItems/{id}:
 *   get:
 *     summary: mencari orderItems berdasarkan ID
 *     tags: [OrderItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID orderItems yang dicari
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.get("/:id", validate(getOrderItemsByIdValidation), controller.getOrderItemsByIdHandler);
/**
 * @swagger
 * /:
 *   post:
 *     summary: membuat Product baru
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - quantity
 *               - PriceAtTime
 *
 *             properties:
 *               orderId:
 *                 type: number
 *                 format: orderId
 *                 example: 1
 *               productId:
 *                 type: number
 *                 format: productId
 *                 example: 1
 *               quantity:
 *                 type: number
 *                 format: quantity
 *                 example: 20
 *               priceAtTime:
 *                 type: number
 *                 format: PriceAtTime
 *                 example: 2000
 *
 *
 *     responses:
 *       200:
 *         description: data berhasil masuk
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: ada kesalahan dalam memasukkan data
 */
router.post("/", validate(createOrderItemsValidation), controller.createOrderItemsHandler);
/**
 * @swagger
 * /orderItems/{id}:
 *   put:
 *     summary: melakukan update pada orderItems
 *     tags: [OrderItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID orderItems yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: number
 *                 example: 2
 *               productId:
 *                 type: number
 *                 example: 2
 *               quantity:
 *                 type: number
 *                 example: 21
 *               priceAtTime:
 *                 type: number
 *                 example: 5000
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.put("/:id", controller.updateOrderItemsHandler);
/**
 * @swagger
 * /orderItems/{id}:
 *   delete:
 *     summary: menghapus orderItems
 *     tags: [OrderItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID orderItems yang akan dihapus
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description:  koneksi terhubung
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                 pagination:
 *                   type: object
 *                 errors:
 *                   type: object
 *
 *       401:
 *         description: koneksi tidak terhubung
 */
router.delete("/:id", controller.deleteOrderItemsHandler);
export default router;
//# sourceMappingURL=orderItems.routes.js.map
