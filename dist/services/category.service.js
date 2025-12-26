export class CategoryService {
    categoryRepo;
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
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
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const category = await this.categoryRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.categoryRepo.countAll(whereClause);
        return {
            category,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getCategoryById(id) {
        const numId = parseInt(id);
        const category = await this.categoryRepo.findById(numId);
        if (!category) {
            throw new Error('Category tidak ditemukan');
        }
        return category;
    }
    async createCategory(data) {
        return await this.categoryRepo.create(data);
    }
    async updateCategory(id, data) {
        await this.getCategoryById(id);
        const numId = parseInt(id);
        return await this.categoryRepo.update(numId, data);
    }
    async deleteCategory(id) {
        const numId = parseInt(id);
        return await this.categoryRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.categoryRepo.getStats();
        const CategoryStats = await this.categoryRepo.getByCategoryStats();
        return {
            overview: stats,
            byCategory: CategoryStats
        };
    }
}
//# sourceMappingURL=category.service.js.map