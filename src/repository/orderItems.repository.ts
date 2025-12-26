import type {  Prisma, PrismaClient, OrderItems } from "../generated";
import type { Decimal } from "../generated/runtime/client";

export interface IOrderItemsRepository {
    list(
        skip: number,
        take: number,
        where: Prisma.OrderItemsWhereInput,
        orderBy: Prisma.OrderItemsOrderByWithRelationInput
    ): Promise<OrderItems[]>;
    countAll(where: Prisma.OrderItemsWhereInput): Promise<number>;
    findById(id: number): Promise<OrderItems | null>;
    create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems>;
    update(id: number, data: Prisma.OrderItemsUpdateInput): Promise<OrderItems>;
    softDelete(id: number): Promise<OrderItems>
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
        }>>
        getByCategoryStats(): Promise<(Prisma.PickEnumerable<Prisma.OrderItemsGroupByOutputType, "priceAtTime"[]> & {
            _avg: {
                priceAtTime: Decimal | null;
            };
            _count: {
                id: number;
            };
        })[]>
}

export class OrderItemsRepository implements IOrderItemsRepository {
    constructor(private prisma: PrismaClient) { }

    async list(
        skip: number,
        take: number,
        where: Prisma.OrderItemsWhereInput,
        orderBy: Prisma.OrderItemsOrderByWithRelationInput
    ): Promise<OrderItems[]> {
        return await this.prisma.orderItems.findMany({
            skip,
            take,
            where,
            orderBy,
            include: { 
                order: true,
             }
        })
    }

    async countAll(where: Prisma.OrderItemsWhereInput): Promise<number> {
        return await this.prisma.orderItems.count({ where })
    }

    async findById(id: number): Promise<OrderItems | null> {
        return await this.prisma.orderItems.findUnique({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                order: true
            }
        })
    }

    async create(data: Prisma.OrderItemsCreateInput): Promise<OrderItems> {
        return await this.prisma.orderItems.create({ data })
    }

    async update(id: number, data: Prisma.OrderItemsUpdateInput): Promise<OrderItems> {
        return await this.prisma.orderItems.update({
            where: {
                id,
                deletedAt: null,
            },
            data
        })
    }

    async softDelete(id: number): Promise<OrderItems> {
        return await this.prisma.orderItems.update({
            where: {
                id,
                deletedAt: null,
            },
            data: {
                deletedAt: new Date()
            }
        })
    }
    
    async findComplex(orderId: number, productId: number) {
            return this.prisma.orderItems.findMany({
        where: {
          OR: [
            {
              AND: [
                { orderId: { equals: orderId } },
                { productId: { equals: productId } },
              ],
            },
            {
              product: {
                category: { name: 'aksesoris' },
              },
            },
          ],
        },
      });
    }
    
        async getStats() {
            return await this.prisma.orderItems.aggregate ({
                _count: { id: true },      
                _avg: { priceAtTime: true },     
                _sum: { quantity: true },     
                _min: { priceAtTime: true },     
                _max: { priceAtTime: true }    
            })
        }
    
        async getByCategoryStats() {
            return await this.prisma.orderItems.groupBy ({
                by: ['priceAtTime'],
                _count: { id: true },
                _avg: { priceAtTime: true }
            })
        }
}
