import { successResponse } from "../utils/response.js";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
        this.getAllProductHandler = this.getAllProductHandler.bind(this);
        this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
        this.createProductHandler = this.createProductHandler.bind(this);
        this.updateProductHandler = this.updateProductHandler.bind(this);
        this.deleteProductHandler = this.deleteProductHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllProductHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || "desc";
        const result = await this.productService.getAll({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages
        };
        successResponse(res, "Product berhasil ditambahkan", result.product, pagination);
    }
    async getProductByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error("tidak ada param");
        }
        const product = await this.productService.getProductById(req.params.id);
        successResponse(res, "product sudah diambil", product);
    }
    async createProductHandler(req, res) {
        const file = req.file;
        if (!file)
            throw new Error("Image is required");
        const imageUrl = `/public/upload${file.filename}`;
        const { name, description, price, stock } = req.body;
        const data = {
            name: name.toString(),
            description: description.toString(),
            price: Number(price),
            stock: Number(stock),
            image: imageUrl
        };
        const users = await this.productService.createProduct(data);
        successResponse(res, "product berhasil ditambakan", users, null, 201);
    }
    async updateProductHandler(req, res) {
        const product = await this.productService.updateProduct(req.params.id, req.body);
        successResponse(res, "product berhasil di update", product);
    }
    async deleteProductHandler(req, res) {
        const deleted = await this.productService.deleteProduct(req.params.id);
        res.json({
            success: true,
            message: "Product berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.productService.exec();
        successResponse(res, "Statistik produk berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=product.controller.js.map
