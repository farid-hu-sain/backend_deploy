import type { Prisma, PrismaClient, Order } from "../generated/index.js";
import type { Decimal } from "../generated/runtime/client.js";
export interface IOrderRepository {
    list(skip: number, take: number, where: Prisma.OrderWhereInput, orderBy: Prisma.OrderOrderByWithRelationInput): Promise<Order[]>;
    countAll(where: Prisma.OrderWhereInput): Promise<number>;
    findById(id: number): Promise<Order | null>;
    create(data: Prisma.OrderCreateInput): Promise<Order>;
    update(id: number, data: Prisma.OrderUpdateInput): Promise<Order>;
    softDelete(id: number): Promise<Order>;
    findComplex(orderId: number, productId: number): Promise<Order[]>;
    getStats(): Promise<Prisma.GetOrderAggregateType<{
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
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderGroupByOutputType, "total"[]> & {
        _avg: {
            total: Decimal | null;
        };
        _count: {
            id: number;
        };
    })[]>;
}
export declare class OrderRepository implements IOrderRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    list(skip: number, take: number, where: Prisma.OrderWhereInput, orderBy: Prisma.OrderOrderByWithRelationInput): Promise<Order[]>;
    countAll(where: Prisma.OrderWhereInput): Promise<number>;
    findById(id: number): Promise<Order | null>;
    create(data: Prisma.OrderCreateInput): Promise<Order>;
    update(id: number, data: Prisma.OrderUpdateInput): Promise<Order>;
    softDelete(id: number): Promise<Order>;
    findComplex(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: Prisma.Decimal;
    }[]>;
    getStats(): Promise<Prisma.GetOrderAggregateType<{
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
    }>>;
    getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderGroupByOutputType, "total"[]> & {
        _count: {
            id: number;
        };
        _avg: {
            total: Prisma.Decimal | null;
        };
    })[]>;
}
//# sourceMappingURL=order.repository.d.ts.map
