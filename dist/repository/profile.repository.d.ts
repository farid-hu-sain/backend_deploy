import type { Prisma, PrismaClient, Profile } from "../generated/index.js";
export interface IProfileRepository {
    list(skip: number, take: number, where: Prisma.ProfileWhereInput, orderBy: Prisma.ProfileOrderByWithRelationInput): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>;
    findComplex(name: string): Promise<Profile[]>;
    getStats(): Promise<Prisma.GetProfileAggregateType<{
        _count: {
            id: true;
        };
        _min: {
            createdAt: true;
        };
        _max: {
            createdAt: true;
        };
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "name"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class ProfileRepository implements IProfileRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.ProfileWhereInput, orderBy: Prisma.ProfileOrderByWithRelationInput): Promise<Profile[]>;
    countAll(where: Prisma.ProfileWhereInput): Promise<number>;
    findById(id: number): Promise<Profile | null>;
    create(data: Prisma.ProfileCreateInput): Promise<Profile>;
    update(id: number, data: Prisma.ProfileUpdateInput): Promise<Profile>;
    softDelete(id: number): Promise<Profile>;
    findComplex(profilename: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        gender: string;
        address: string;
        profile_picture_url: string;
        userId: number;
    }[]>;
    getStats(): Promise<Prisma.GetProfileAggregateType<{
        _count: {
            id: true;
        };
        _min: {
            createdAt: true;
        };
        _max: {
            createdAt: true;
        };
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.ProfileGroupByOutputType, "name"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=profile.repository.d.ts.map
