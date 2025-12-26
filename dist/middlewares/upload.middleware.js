import multer from 'multer';
import path from 'node:path';
export const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 109);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
export const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
export const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: fileFilter
});
//# sourceMappingURL=upload.middleware.js.map