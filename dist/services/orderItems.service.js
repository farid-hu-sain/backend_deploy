export class OrderItemsService {
    orderItemsRepo;
    constructor(orderItemsRepo) {
        this.orderItemsRepo = orderItemsRepo;
    }
    async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const whereClause = {
            deletedAt: null
        };
        if (search?.orderId) {
            whereClause.orderId = search.orderId;
        }
        if (search?.productId) {
            whereClause.productId = search.productId;
        }
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        const orderItems = await this.orderItemsRepo.list(skip, limit, whereClause, sortCriteria);
        const total = await this.orderItemsRepo.countAll(whereClause);
        return {
            orderItems,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
    async getOrderItemsById(id) {
        const numId = parseInt(id);
        const orderItems = await this.orderItemsRepo.findById(numId);
        if (!orderItems) {
            throw new Error('OrderItems tidak ditemukan');
        }
        return orderItems;
    }
    async createOrderItems(data) {
        return await this.orderItemsRepo.create({
            ...data,
            order: { connect: { id: data.orderId } },
            product: { connect: { id: data.productId } }
        });
    }
    async updateOrderItems(id, data) {
        await this.getOrderItemsById(id);
        const numId = parseInt(id);
        return await this.orderItemsRepo.update(numId, data);
    }
    async deleteOrderItems(id) {
        const numId = parseInt(id);
        return await this.orderItemsRepo.softDelete(numId);
    }
    async exec() {
        const stats = await this.orderItemsRepo.getStats();
        const CategoryStats = await this.orderItemsRepo.getByCategoryStats();
        return {
            overview: stats,
            byCategory: CategoryStats
        };
    }
}
//# sourceMappingURL=orderItems.service.js.map