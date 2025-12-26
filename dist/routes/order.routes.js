import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { validate } from "../utils/validator.js";
import { createOrderValidation, getOrderByIdValidation } from "../middlewares/order.validation.js";
import { OrderRepository } from "../repository/order.repository.js";
import { OrderService } from "../services/order.service.js";
import prismaIntance from "../database.js";
const repo = new OrderRepository(prismaIntance);
const service = new OrderService(repo);
const controller = new OrderController(service);
const router = Router();
/**
 * @swagger
 * tags:
 *  name: Order
 *  description: Manajemen order pengguna
 */
/**
 * @swagger
 * /order:
 *   get:
 *     summary: mengambil semua order
 *     tags: [Order]
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
router.get("/", controller.getAllOrderHandler);
/**
 * @swagger
 * /order/stats:
 *   get:
 *     summary: menyortir bagian order
 *     tags: [Order]
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
 * /order/{id}:
 *   get:
 *     summary: mencari order berdasarkan ID
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID order yang dicari
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
router.get("/:id", validate(getOrderByIdValidation), controller.getOrderByIdHandler);
/**
 * @swagger
 * /order:
 *   post:
 *     summary: membuat Order baru
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - total
 *               - orderItems
 *             properties:
 *               userId:
 *                 type: string
 *                 format: userId
 *                 example: 1
 *               total :
 *                  type: string
 *                  format: total
 *                  example: 10
 *               orderItems:
 *                 type: string
 *                 format: orderItems
 *                 example: 10
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
 *         description: order, Email atau password salah
 */
router.post("/", validate(createOrderValidation), controller.createOrderHandler);
/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: melakukan update pada order
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID order yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: userId
 *                 example: 2
 *               total :
 *                  type: string
 *                  format: total
 *                  example: 15
 *               orderItems:
 *                 type: string
 *                 format: orderItems
 *                 example: 15
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
router.post("/:id", controller.updateOrderHandler);
/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: menghapus order
 *     tags: [Order]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID order yang akan dihapus
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
router.delete("/:id", controller.deleteOrderHandler);
export default router;
//# sourceMappingURL=order.routes.js.map
