import type { Prisma, PrismaClient, OrderItems } from "../generated/index.js";
import type { Decimal } from "../generated/runtime/client.js";
export interface IOrderItemsRepository {
    list(skip: number, take: number, where: Prisma.OrderItemsWhereInput, orderBy: Prisma.OrderItemsOrderByWithRelationInput): Promise<OrderItems[]>;
    countAll(where: Prisma.OrderItemsWhereInput): Promise<number>;
    findById(id: number): Promise<OrderItems | null>;
    create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
    update(id: number, data: Prisma.OrderItemsUpdateInput): Promise<OrderItems>;
    softDelete(id: number): Promise<OrderItems>;
    findComplex(orderId: number, productId: number): Promise<OrderItems[]>;
    getStats(): Promise<Prisma.GetOrderItemsAggregateType<{
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
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderItemsGroupByOutputType, "priceAtTime"[]> & {
        _avg: {
            priceAtTime: Decimal | null;
        };
        _count: {
            id: number;
        };
    })[]>;
}
export declare class OrderItemsRepository implements IOrderItemsRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.OrderItemsWhereInput, orderBy: Prisma.OrderItemsOrderByWithRelationInput): Promise<OrderItems[]>;
    countAll(where: Prisma.OrderItemsWhereInput): Promise<number>;
    findById(id: number): Promise<OrderItems | null>;
    create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
    update(id: number, data: Prisma.OrderItemsUpdateInput): Promise<OrderItems>;
    softDelete(id: number): Promise<OrderItems>;
    findComplex(orderId: number, productId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        orderId: number;
        productId: number;
        quantity: number;
        priceAtTime: Prisma.Decimal;
    }[]>;
    getStats(): Promise<Prisma.GetOrderItemsAggregateType<{
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
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderItemsGroupByOutputType, "priceAtTime"[]> & {
        _count: {
            id: number;
        };
        _avg: {
            priceAtTime: Prisma.Decimal | null;
        };
    })[]>;
}
//# sourceMappingURL=orderItems.repository.d.ts.map
