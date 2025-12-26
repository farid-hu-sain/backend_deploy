export class CategoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                products: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.category.count({ where });
    }
    async findById(id) {
        return await this.prisma.category.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                products: true
            }
        });
    }
    async create(data) {
        return await this.prisma.category.create({ data });
    }
    async update(id, data) {
        return await this.prisma.category.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.category.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(name) {
        return this.prisma.category.findMany({
            where: {
                OR: [
                    { name: name },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.category.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByCategoryStats() {
        return await this.prisma.category.groupBy({
            by: ['name'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=category.repository.js.map