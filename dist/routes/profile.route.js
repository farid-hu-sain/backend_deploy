import { Router } from "express";
import { createProfileValidation, getProfileByIdValidation } from "../middlewares/profile.validation.js";
import { ProfileController } from "../controllers/profile.controller.js";
import { validate } from "../utils/validator.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { ProfileRepository } from "../repository/profile.repository.js";
import prismaIntance from "../database.js";
import { ProfileService } from "../services/profile.service.js";
const router = Router();
const repo = new ProfileRepository(prismaIntance);
const service = new ProfileService(repo);
const controller = new ProfileController(service);
/**
 * @swagger
 * tags:
 *  name: Profile
 *  description: Manajemen profile pengguna
 */
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: mengambil semua profile
 *     tags: [Profile]
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
router.get("/", controller.getAllProfileHandler);
/**
 * @swagger
 * /profile/stats:
 *   get:
 *     summary: menyortir bagian profile
 *     tags: [Profile]
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
 * /profile/{id}:
 *   get:
 *     summary: mencari profile berdasarkan ID
 *     tags: [Profile]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID profile yang dicari
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
router.get("/:id", validate(getProfileByIdValidation), controller.getProfileByIdHandler);
/**
 * @swagger
 * /profile:
 *   post:
 *     summary: membuat Profile baru
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - gender
 *               - address
 *               - profile_picture_url
 *               - profileId
 *
 *             properties:
 *               name:
 *                 type: string
 *                 format: name
 *                 example: Belle
 *               gender :
 *                  type: string
 *                  format: gender
 *                  example: laki-laki
 *               address:
 *                 type: string
 *                 format: address
 *                 example: jln Ahmad Yani no.3 perumahan Alam sutra, Tanggerang, Jawa Barat
 *               prifile_picture_url:
 *                  type: string
 *                  format: picture
 *                  example: data:image/jpeg;base64,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
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
router.post("/", authenticate, upload.single("image"), validate(createProfileValidation), controller.createProfileHandler);
/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: melakukan update pada profile
 *     tags: [Profile]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID profile yang akan diupdate
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
 *                 example: Belle
 *               gender :
 *                  type: string
 *                  format: gender
 *                  example: laki-laki
 *               address:
 *                 type: string
 *                 format: address
 *                 example: jln Ahmad Yani no.3 perumahan Alam sutra, Tanggerang, Jawa Barat
 *               prifile_picture_url:
 *                  type: string
 *                  format: picture
 *                  example: data:image/jpeg;base64,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
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
router.put("/:id", controller.updateProfileHandler);
/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     summary: menghapus profile
 *     tags: [Profile]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID profile yang akan dihapus
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
router.delete("/:id", controller.deleteProfileHandler);
export default router;
//# sourceMappingURL=profile.route.js.map
