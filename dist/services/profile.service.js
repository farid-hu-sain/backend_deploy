export class ProfileService {
    profileRepo;
    constructor(profileRepo) {
        this.profileRepo = profileRepo;
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
        if (search?.gender) {
            whereClause.gender = { contains: search.gender, mode: "insensitive" };
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const profile = await this.profileRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.profileRepo.countAll(whereClause);
        return {
            profile,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getProfileById(id) {
        const numId = parseInt(id);
        const profile = await this.profileRepo.findById(numId);
        if (!profile) {
            throw new Error('Profile tidak ditemukan');
        }
        return profile;
    }
    async createProfile(data) {
        return await this.profileRepo.create({
            ...data,
            user: { connect: { id: data.userId } }
        });
    }
    async updateProfile(id, data) {
        await this.getProfileById(id);
        const numId = parseInt(id);
        return await this.profileRepo.update(numId, data);
    }
    async deleteProfile(id) {
        const numId = parseInt(id);
        return await this.profileRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.profileRepo.getStats();
        const CategoryStats = await this.profileRepo.getByCategoryStats();
        return {
            overview: stats,
            byCategory: CategoryStats
        };
    }
}
//# sourceMappingURL=profile.service.js.map