export class OrderRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.order.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                orderItems: true,
                user: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.order.count({ where });
    }
    async findById(id) {
        return await this.prisma.order.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                orderItems: true,
                user: true
            }
        });
    }
    async create(data) {
        return await this.prisma.order.create({ data });
    }
    async update(id, data) {
        return await this.prisma.order.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.order.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(userId) {
        return this.prisma.order.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { userId: { equals: userId } },
                        ]
                    }
                ]
            }
        });
    }
    async getStats() {
        return await this.prisma.order.aggregate({
            _count: { id: true },
            _avg: { total: true },
            _sum: { total: true },
            _min: { total: true },
            _max: { total: true }
        });
    }
    async getByCategoryStats() {
        return await this.prisma.order.groupBy({
            by: ['total'],
            _count: { id: true },
            _avg: { total: true }
        });
    }
}
//# sourceMappingURL=order.repository.js.map