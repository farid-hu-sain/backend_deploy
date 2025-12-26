import { successResponse } from "../utils/response.js";
export class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.getAllCategoryHandler = this.getAllCategoryHandler.bind(this);
        this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this);
        this.createCategoryHandler = this.createCategoryHandler.bind(this);
        this.updateCategoryHandler = this.updateCategoryHandler.bind(this);
        this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllCategoryHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || "desc";
        const result = await this.categoryService.getAll({
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
        successResponse(res, "Category berhasil ditambahkan", result.category, pagination);
    }
    async getCategoryByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error("tidak ada param");
        }
        const category = await this.categoryService.getCategoryById(req.params.id);
        successResponse(res, "category sudah diambil", category);
    }
    async createCategoryHandler(req, res) {
        const { name } = req.body;
        const data = {
            name: name.toString()
        };
        const categorys = await this.categoryService.createCategory(data);
        successResponse(res, "category berhasil ditambakan", categorys, null, 201);
    }
    async updateCategoryHandler(req, res) {
        const category = await this.categoryService.updateCategory(req.params.id, req.body);
        successResponse(res, "category berhasil di update", category);
    }
    async deleteCategoryHandler(req, res) {
        const deleted = await this.categoryService.deleteCategory(req.params.id);
        res.json({
            success: true,
            message: "Category berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.categoryService.exec();
        successResponse(res, "Statistik produk berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=category.controller.js.map
