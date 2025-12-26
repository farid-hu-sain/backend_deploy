export class ProfileRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(skip, take, where, orderBy) {
        return await this.prisma.profile.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
            }
        });
    }
    async countAll(where) {
        return await this.prisma.profile.count({ where });
    }
    async findById(id) {
        return await this.prisma.profile.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                user: true,
            }
        });
    }
    async create(data) {
        return await this.prisma.profile.create({ data });
    }
    async update(id, data) {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        });
    }
    async softDelete(id) {
        return await this.prisma.profile.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        });
    }
    async findComplex(profilename) {
        return this.prisma.profile.findMany({
            where: {
                OR: [
                    { name: profilename },
                ],
            },
        });
    }
    async getStats() {
        return await this.prisma.profile.aggregate({
            _count: { id: true },
            _min: { createdAt: true },
            _max: { createdAt: true }
        });
    }
    async getByCategoryStats() {
        return await this.prisma.profile.groupBy({
            by: ['name'],
            _count: { id: true },
        });
    }
}
//# sourceMappingURL=profile.repository.js.map