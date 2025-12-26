export class OrderItemsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.orderItems.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                order: true,
            }
        });
    }
    async countAll(where) {
        return await this.prisma.orderItems.count({ where });
    }
    async findById(id) {
        return await this.prisma.orderItems.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                order: true
            }
        });
    }
    async create(data) {
        return await this.prisma.orderItems.create({ data });
    }
    async update(id, data) {
        return await this.prisma.orderItems.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.orderItems.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(orderId, productId) {
        return this.prisma.orderItems.findMany({
            where: {
                OR: [
                    {
                        AND: [
                            { orderId: { equals: orderId } },
                            { productId: { equals: productId } },
                        ],
                    },
                    {
                        product: {
                            category: { name: 'aksesoris' },
                        },
                    },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.orderItems.aggregate({
            _count: { id: true },
            _avg: { priceAtTime: true },
            _sum: { quantity: true },
            _min: { priceAtTime: true },
            _max: { priceAtTime: true }
        });
    }
    async getByCategoryStats() {
        return await this.prisma.orderItems.groupBy({
            by: ['priceAtTime'],
            _count: { id: true },
            _avg: { priceAtTime: true }
        });
    }
}
//# sourceMappingURL=orderItems.repository.js.map