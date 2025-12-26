import type { Prisma, PrismaClient, User } from "../generated/index.js";
export interface IUserRepository {
    list(skip: number, take: number, where: Prisma.UserWhereInput, orderBy: Prisma.UserOrderByWithRelationInput): Promise<User[]>;
    countAll(where: Prisma.UserWhereInput): Promise<number>;
    findById(id: number): Promise<null | User>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
    softDelete(id: number): Promise<User>;
    findComplex(role: string): Promise<User[]>;
    getStats(): Promise<Prisma.GetUserAggregateType<{
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
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.UserGroupByOutputType, "role"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
export declare class UserRepository implements IUserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.UserWhereInput, orderBy: Prisma.UserOrderByWithRelationInput): Promise<User[]>;
    countAll(where: Prisma.UserWhereInput): Promise<number>;
    findById(id: number): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
    softDelete(id: number): Promise<User>;
    findComplex(username: string): Promise<{
        id: number;
        username: string;
        email: string;
        password_hash: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    getStats(): Promise<Prisma.GetUserAggregateType<{
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
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.UserGroupByOutputType, "role"[]> & {
        _count: {
            id: number;
        };
    })[]>;
}
//# sourceMappingURL=user.repository.d.ts.map
