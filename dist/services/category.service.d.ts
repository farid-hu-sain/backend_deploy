import type { Prisma, Category } from "../generated/index.js";
import type { ICategoryRepository } from "../repository/category.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface CategoryListRespone {
    category: Category[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface ICategoryService {
    getAll(params: FindAllParams): Promise<CategoryListRespone>;
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(data: {
        name: string;
    }): Promise<Category>;
    updateCategory(id: string, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<Category>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class CategoryService implements ICategoryService {
    private categoryRepo;
    constructor(categoryRepo: ICategoryRepository);
    getAll(params: FindAllParams): Promise<CategoryListRespone>;
    getCategoryById(id: string): Promise<Category | null>;
    createCategory(data: {
        name: string;
    }): Promise<Category>;
    updateCategory(id: string, data: Partial<Category>): Promise<Category>;
    deleteCategory(id: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    exec(): Promise<{
        overview: Prisma.GetCategoryAggregateType<{
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
        byCategory: (Prisma.PickEnumerable<Prisma.CategoryGroupByOutputType, "name"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=category.service.d.ts.map
