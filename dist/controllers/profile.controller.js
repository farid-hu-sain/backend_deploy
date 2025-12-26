import { successResponse } from "../utils/response.js";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
        this.getAllProfileHandler = this.getAllProfileHandler.bind(this);
        this.getProfileByIdHandler = this.getProfileByIdHandler.bind(this);
        this.createProfileHandler = this.createProfileHandler.bind(this);
        this.updateProfileHandler = this.updateProfileHandler.bind(this);
        this.deleteProfileHandler = this.deleteProfileHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllProfileHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || "desc";
        const result = await this.profileService.getAll({
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
        successResponse(res, "Profile berhasil ditambahkan", result.profile, pagination);
    }
    async getProfileByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error("tidak ada param");
        }
        const profile = await this.profileService.getProfileById(req.params.id);
        successResponse(res, "profile sudah diambil", profile);
    }
    async createProfileHandler(req, res) {
        const file = req.file;
        if (!file)
            throw new Error("Image is required");
        const imageUrl = `/public/upload${file.filename}`;
        const { name, gender, address, userId } = req.body;
        const data = {
            name: name.toString(),
            gender: gender.toString(),
            address: address.toString(),
            profile_picture_url: imageUrl,
            userId: Number(userId)
        };
        const profiles = await this.profileService.createProfile(data);
        successResponse(res, "profile berhasil ditambakan", profiles, null, 201);
    }
    async updateProfileHandler(req, res) {
        const profile = await this.profileService.updateProfile(req.params.id, req.body);
        successResponse(res, "profile berhasil di update", profile);
    }
    async deleteProfileHandler(req, res) {
        const deleted = await this.profileService.deleteProfile(req.params.id);
        res.json({
            success: true,
            message: "Profile berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.profileService.exec();
        successResponse(res, "Statistik produk berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=profile.controller.js.map
