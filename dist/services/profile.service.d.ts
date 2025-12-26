import type { Prisma, Profile } from "../generated/index.js";
import type { IProfileRepository } from "../repository/profile.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        gender?: string;
        address?: string;
        profile_picture_url?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface ProfileListRespone {
    profile: Profile[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IProfileService {
    getAll(params: FindAllParams): Promise<ProfileListRespone>;
    getProfileById(id: string): Promise<Profile | null>;
    createProfile(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url: string;
        userId: number;
    }): Promise<Profile>;
    updateProfile(id: string, data: Partial<Profile>): Promise<Profile>;
    deleteProfile(id: string): Promise<Profile>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class ProfileService implements IProfileService {
    private profileRepo;
    constructor(profileRepo: IProfileRepository);
    getAll(params: FindAllParams): Promise<ProfileListRespone>;
    getProfileById(id: string): Promise<Profile | null>;
    createProfile(data: {
        name: string;
        gender: string;
        address: string;
        profile_picture_url: string;
        userId: number;
    }): Promise<Profile>;
    updateProfile(id: string, data: Partial<Profile>): Promise<Profile>;
    deleteProfile(id: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        gender: string;
        address: string;
        profile_picture_url: string;
        userId: number;
    }>;
    exec(): Promise<{
        overview: Prisma.GetProfileAggregateType<{
            _count: {
                id: true;
            };
            _min: {
                createdAt: true;
            };
            _max: {
                createdAt: true;
            };
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "name"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=profile.service.d.ts.map
