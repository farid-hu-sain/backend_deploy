import prisma from "../database.js";
export const checkoutOrder = async (data, userId) => {
    return prisma.$transaction(async (tx) => {
        if (!data.orderItem.length) {
            throw new Error("Order item tidak boleh kosong");
        }
        let total = 0;
        const products = await tx.product.findMany({
            where: {
                deletedAt: null,
                id: { in: data.orderItem.map(i => i.productId) }
            },
            select: {
                id: true,
                price: true,
                stock: true
            }
        });
        const productMap = new Map(products.map(p => [p.id, p]));
        const orderItemsData = [];
        for (const item of data.orderItem) {
            const product = productMap.get(item.productId);
            if (!product)
                throw new Error(`Product ${item.productId} tidak ditemukan`);
            if (product.stock < item.quantity) {
                throw new Error(`Stock produk ${item.productId} tidak cukup`);
            }
            total += Number(product.price) * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                priceAtTime: product.price
            });
            await tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }
            });
        }
        return tx.order.create({
            data: {
                userId: userId,
                total,
                orderItems: { create: orderItemsData }
            },
            include: {
                user: true,
                orderItems: { include: { product: true } }
            }
        });
    });
};
// ==========================================================================
export class OrderService {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.userId) {
            whereClause.userId = search.userId;
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const order = await this.orderRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.orderRepo.countAll(whereClause);
        return {
            order,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getOrderById(id) {
        const numId = parseInt(id);
        const order = await this.orderRepo.findById(numId);
        if (!order) {
            throw new Error("Order tidak ditemukan");
        }
        return order;
    }
    async createOrder(data) {
        return await this.orderRepo.create({
            ...data,
            user: { connect: { id: data.userId } }
        });
    }
    async updateOrder(id, data) {
        await this.getOrderById(id);
        const numId = parseInt(id);
        return await this.orderRepo.update(numId, data);
    }
    async deleteOrder(id) {
        const numId = parseInt(id);
        return await this.orderRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.orderRepo.getStats();
        const CategoryStats = await this.orderRepo.getByCategoryStats();
        return {
            overview: stats,
            byCategory: CategoryStats
        };
    }
}
//# sourceMappingURL=order.service.js.map
