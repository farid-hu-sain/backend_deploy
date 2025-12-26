import { Router } from "express"
import { createProductValidation, getProductByIdValidation } from "../middlewares/product.validation";
import { ProductController } from "../controllers/product.controller";

import { validate } from "../utils/validator";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import { ProductRepository } from "../repository/product.repository";
import prismaIntance from "../prisma";
import { ProductService } from "../services/product.service";


const router = Router()
const repo = new ProductRepository(prismaIntance)
const service = new ProductService(repo)
const controller = new ProductController(service)

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: Manajemen product pengguna
 */

/**
 * @swagger
 * /product:
 *   get:
 *     summary: mengambil semua product
 *     tags: [Product]
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
router.get('/', controller.getAllProductHandler)


/**
 * @swagger
 * /product/stats:
 *   get:
 *     summary: menyortir bagian product
 *     tags: [Product]
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
router.get('/stats', controller.getstats)


/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: mencari product berdasarkan ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID product yang dicari
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
router.get('/:id',validate(getProductByIdValidation), controller.getProductByIdHandler);


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
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - image
 * 
 *             properties:
 *               name:
 *                 type: string
 *                 format: name
 *                 example: Laptop ROG
 *               description : 
 *                  type: string
 *                  format: description
 *                  example: Laptop bertenaga dengan performa tinggi, cocok untuk gaming dan multitasking berat.
 *               price:
 *                 type: number
 *                 format: price
 *                 example: 15000000
 *               stock: 
 *                  type: number
 *                  format: stock 
 *                  example: 50
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
router.post('/',authenticate, upload.single("image"), validate(createProductValidation), controller.createProductHandler);


/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: melakukan update pada product
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID product yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 format: name
 *                 example: Laptop Predator
 *               description : 
 *                  type: string
 *                  format: description
 *                  example: Laptop bertenaga dengan performa tinggi, cocok untuk gaming dan multitasking berat.
 *               price:
 *                 type: number
 *                 format: price
 *                 example: 16000000
 *               stock: 
 *                  type: number
 *                  format: stock 
 *                  example: 40
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
router.put('/:id', controller.updateProductHandler)


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: menghapus product
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID product yang akan dihapus
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
router.delete('/:id', controller.deleteProductHandler);



export default router
