import type { Prisma, OrderItems } from "../generated/index.js";
import type { IOrderItemsRepository } from "../repository/orderItems.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        orderId?: number;
        productId?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface OrderItemsListRespone {
    orderItems: OrderItems[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IOrderItemsService {
    getAll(params: FindAllParams): Promise<OrderItemsListRespone>;
    getOrderItemsById(id: string): Promise<OrderItems | null>;
    createOrderItems(data: {
        orderId: number;
        productId: number;
        quantity: number;
        priceAtTime: number;
    }): Promise<OrderItems>;
    updateOrderItems(id: string, data: Partial<OrderItems>): Promise<OrderItems>;
    deleteOrderItems(id: string): Promise<OrderItems>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare class OrderItemsService implements IOrderItemsService {
    private orderItemsRepo;
    constructor(orderItemsRepo: IOrderItemsRepository);
    getAll(params: FindAllParams): Promise<OrderItemsListRespone>;
    getOrderItemsById(id: string): Promise<OrderItems | null>;
    createOrderItems(data: {
        orderId: number;
        productId: number;
        quantity: number;
        priceAtTime: number;
    }): Promise<OrderItems>;
    updateOrderItems(id: string, data: Partial<OrderItems>): Promise<OrderItems>;
    deleteOrderItems(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        orderId: number;
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }>;
    exec(): Promise<{
        overview: Prisma.GetOrderItemsAggregateType<{
            _count: {
                id: true;
            };
            _avg: {
                priceAtTime: true;
            };
            _sum: {
                quantity: true;
            };
            _min: {
                priceAtTime: true;
            };
            _max: {
                priceAtTime: true;
            };
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.OrderItemsGroupByOutputType, "priceAtTime"[]> & {
            _avg: {
                priceAtTime: Prisma.Decimal | null;
            };
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=orderItems.service.d.ts.map
