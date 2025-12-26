import type { Prisma, Order } from "../generated/index.js";
import type { IOrderRepository } from "../repository/order.repository.js";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        userId?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export interface CreateOrder {
    orderItem: OrderItemInput[];
}
export interface OrderItemInput {
    productId: number;
    quantity: number;
}
export interface OrderListRespone {
    order: Order[];
    total: number;
    totalPages: number;
    currentPage: number;
}
export interface IOrderService {
    getAll(params: FindAllParams): Promise<OrderListRespone>;
    getOrderById(id: string): Promise<Order | null>;
    createOrder(data: {
        userId: number;
        total: number;
        orderItems: number;
    }): Promise<Order>;
    updateOrder(id: string, data: Partial<Order>): Promise<Order>;
    deleteOrder(id: string): Promise<Order>;
    exec(): Promise<{
        overview: any;
        byCategory: any;
    }>;
}
export declare const checkoutOrder: (data: CreateOrder, userId: number) => Promise<{
    user: {
        id: number;
        username: string;
        email: string;
        password_hash: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    };
    orderItems: ({
        product: {
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
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        orderId: number;
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    })[];
} & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    userId: number;
    total: Prisma.Decimal;
}>;
export declare class OrderService implements IOrderService {
    private orderRepo;
    constructor(orderRepo: IOrderRepository);
    getAll(params: FindAllParams): Promise<OrderListRespone>;
    getOrderById(id: string): Promise<Order | null>;
    createOrder(data: {
        userId: number;
        total: number;
    }): Promise<Order>;
    updateOrder(id: string, data: Partial<Order>): Promise<Order>;
    deleteOrder(id: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: Prisma.Decimal;
    }>;
    exec(): Promise<{
        overview: Prisma.GetOrderAggregateType<{
            _count: {
                id: true;
            };
            _avg: {
                total: true;
            };
            _sum: {
                total: true;
            };
            _min: {
                total: true;
            };
            _max: {
                total: true;
            };
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.OrderGroupByOutputType, "total"[]> & {
            _avg: {
                total: Prisma.Decimal | null;
            };
            _count: {
                id: number;
            };
        })[];
    }>;
}
export {};
//# sourceMappingURL=order.service.d.ts.map
