import type { Category, Prisma, Product } from "../generated/index.js";
import type { IProductRepository } from "../repository/product.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        max_price?: number;
        min_price?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface ProductListRespone {
    product: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IProductService {
    getAll(params: FindAllParams): Promise<ProductListRespone>;
    getProductById(id: string): Promise<Category | null & Product | null>;
    createProduct(data: {
        name: string;
        descrption?: string;
        price: number;
        stock: number;
        image: string;
        cateoryId?: number;
    }): Promise<Product>;
    updateProduct(id: string, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class ProductService implements IProductService {
    private productRepo;
    constructor(productRepo: IProductRepository);
    getAll(params: FindAllParams): Promise<ProductListRespone>;
    getProductById(id: string): Promise<Category | null & Product | null>;
    createProduct(data: {
        name: string;
        description: string;
        price: number;
        stock: number;
        image: string;
    }): Promise<Product>;
    updateProduct(id: string, data: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        description: string | null;
        price: Prisma.Decimal;
        stock: number;
        image: string;
        categoryId: number | null;
    }>;
    exec(): Promise<{
        overview: Prisma.GetProductAggregateType<{
            _count: {
                id: true;
            };
            _avg: {
                price: true;
            };
            _sum: {
                stock: true;
            };
            _min: {
                price: true;
            };
            _max: {
                price: true;
            };
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
            _avg: {
                price: Prisma.Decimal | null;
            };
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=product.service.d.ts.map
