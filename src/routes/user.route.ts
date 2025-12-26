import { Router } from "express"
import { UserController } from "../controllers/user.controller";
import { validate } from "../utils/validator";
import { createUserValidation, getUserByIdValidation } from "../middlewares/user.validation";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../services/user.service";
import prismaIntance from "../prisma";

const repo = new UserRepository(prismaIntance)
const service = new UserService(repo)
const controller = new UserController(service)



const router = Router()

/**
 * @swagger
 * tags:
 *  name: User
 *  description: Manajemen user pengguna
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: mengambil semua user
 *     tags: [User]
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
router.get('/', controller.getAllUserHandler)


/**
 * @swagger
 * /user/stats:
 *   get:
 *     summary: menyortir bagian user
 *     tags: [User]
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
 * /user/{id}:
 *   get:
 *     summary: mencari user berdasarkan ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang dicari
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
router.get('/:id',validate(getUserByIdValidation), controller.getUserByIdHandler);



/**
 * @swagger
 * /user:
 *   post:
 *     summary: membuat User baru
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - role
 * 
 *             properties:
 *               username:
 *                 type: string
 *                 format: username
 *                 example: Belle
 *               email : 
 *                  type: string
 *                  format: email
 *                  example: Belle123@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: ayambakarmadu
 *               role: 
 *                  type: string
 *                  format: role
 *                  example: USER
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
router.post('/', validate(createUserValidation), controller.createUserHandler);


/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: melakukan update pada user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang akan diupdate
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: jawa@gmail.com
 *               username:
 *                 type: string
 *                 example: jaw3
 *               password_hash:
 *                 type: string
 *                 example: jawajawajaw3
 *               role:
 *                 type: string
 *                 example: Dewa
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
router.put('/:id', controller.updateUserHandler)


/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: menghapus user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID user yang akan dihapus
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
router.delete('/:id', controller.deleteUserHandler );

export default router
