export class ProductService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.name) {
            whereClause.name = { contains: search.name, mode: "insensitive" };
        }
        if (search?.min_price) {
            whereClause.price = { gte: search.min_price };
        }
        if (search?.max_price) {
            whereClause.price = { lte: search.max_price };
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const product = await this.productRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.productRepo.countAll(whereClause);
        return {
            product,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getProductById(id) {
        const numId = parseInt(id);
        const product = await this.productRepo.findById(numId);
        if (!product) {
            throw new Error('Product tidak ditemukan');
        }
        return product;
    }
    async createProduct(data) {
        return await this.productRepo.create(data);
    }
    async updateProduct(id, data) {
        await this.getProductById(id);
        const numId = parseInt(id);
        return await this.productRepo.update(numId, data);
    }
    async deleteProduct(id) {
        const numId = parseInt(id);
        return await this.productRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.productRepo.getStats();
        const CategoryStats = await this.productRepo.getProductsByCategoryStats();
        return {
            overview: stats,
            byCategory: CategoryStats
        };
    }
}
//# sourceMappingURL=product.service.js.map