export class UserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.user.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                orders: true,
                profile: true
            }
        });
    }
    async countAll(where) {
        return await this.prisma.user.count({ where });
    }
    async findById(id) {
        return await this.prisma.user.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                profile: true,
                orders: true
            }
        });
    }
    async create(data) {
        return await this.prisma.user.create({ data });
    }
    async update(id, data) {
        return await this.prisma.user.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.user.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(username) {
        return this.prisma.user.findMany({
            where: {
                OR: [
                    { username: username },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.user.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByCategoryStats() {
        return await this.prisma.user.groupBy({
            by: ['role'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=user.repository.js.map