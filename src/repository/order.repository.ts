import type {  Prisma, PrismaClient, Order } from "../generated/client";
import type { Decimal } from "../generated/runtime/client";

export interface IOrderRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.OrderWhereInput,
        orderBy: Prisma.OrderOrderByWithRelationInput
    ): Promise<Order[]>;
    countAll(where: Prisma.OrderWhereInput): Promise<number>;
    findById(id: number): Promise<Order | null>;
    create(data: Prisma.OrderCreateInput): Promise<Order>;
    update(id: number, data: Prisma.OrderUpdateInput): Promise<Order>;
    softDelete(id: number): Promise<Order>
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
            }>>
            getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderGroupByOutputType, "total"[]> & {
                _avg: {
                    total: Decimal | null;
                };
                _count: {
                    id: number;
                };
            })[]>
}

export class OrderRepository implements IOrderRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.OrderWhereInput,
        orderBy: Prisma.OrderOrderByWithRelationInput
    ): Promise<Order[]> {
        return await this.prisma.order.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                orderItems: true,
                user: true
             }
        })
    }

    async countAll(where: Prisma.OrderWhereInput): Promise<number> {
        return await this.prisma.order.count({ where })
    }

    async findById(id: number): Promise<Order | null> {
        return await this.prisma.order.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                orderItems: true,
                user: true
            }
        })
    }

    async create(data: Prisma.OrderCreateInput): Promise<Order> {
        return await this.prisma.order.create({ data })
    }

    async update(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
        return await this.prisma.order.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<Order> {
        return await this.prisma.order.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }

    async findComplex(userId: number) {
            return this.prisma.order.findMany({
        where: {
          OR: [
            {
              AND: [
                { userId: { equals: userId } },
              ]
            }
          ]
        }
      })
    }
    
        async getStats() {
            return await this.prisma.order.aggregate ({
                _count: { id: true },      
                _avg: { total: true },     
                _sum: { total: true },     
                _min: { total: true },     
                _max: { total: true }    
            })
        }
    
        async getByCategoryStats() {
            return await this.prisma.order.groupBy ({
                by: ['total'],
                _count: { id: true },
                _avg: { total: true }
            })
        }
}