import type { Prisma, User } from "../generated/index.js";
import type { IUserRepository } from "../repository/user.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        username?: string;
        email?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface UserListRespone {
    user: User[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IUserService {
    getAll(params: FindAllParams): Promise<UserListRespone>;
    getUserById(id: string): Promise<User | null>;
    createUser(data: {
        username: string;
        email: string;
        password_hash: string;
        role: string;
    }): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<User>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class UserService implements IUserService {
    private userRepo;
    constructor(userRepo: IUserRepository);
    getAll(params: FindAllParams): Promise<UserListRespone>;
    getUserById(id: string): Promise<User | null>;
    createUser(data: {
        username: string;
        email: string;
        password_hash: string;
        role: string;
    }): Promise<User>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<{
        id: number;
        username: string;
        email: string;
        password_hash: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    exec(): Promise<{
        overview: Prisma.GetUserAggregateType<{
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
        byCategory: (Prisma.PickEnumerable<Prisma.UserGroupByOutputType, "role"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=user.service.d.ts.map
