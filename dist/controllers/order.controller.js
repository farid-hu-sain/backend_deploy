import { successResponse } from "../utils/response.js";
export class OrderController {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
        this.getAllOrderHandler = this.getAllOrderHandler.bind(this);
        this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this);
        this.createOrderHandler = this.createOrderHandler.bind(this);
        this.updateOrderHandler = this.updateOrderHandler.bind(this);
        this.deleteOrderHandler = this.deleteOrderHandler.bind(this);
        this.getstats = this.getstats.bind(this);
    }
    async getAllOrderHandler(req, res) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = req.query.sortBy;
        const sortOrder = req.query.sortOrder || "desc";
        const result = await this.orderService.getAll({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });
        const pagination = {
            page: result.currentPage,
            limit,
            total: result.total,
            totalPages: result.totalPages
        };
        successResponse(res, "Order berhasil ditambahkan", result.order, pagination);
    }
    async getOrderByIdHandler(req, res) {
        if (!req.params.id) {
            throw new Error("tidak ada param");
        }
        const order = await this.orderService.getOrderById(req.params.id);
        successResponse(res, "order sudah diambil", order);
    }
    async createOrderHandler(req, res) {
        const { userId, total, orderItems } = req.body;
        const data = {
            userId: Number(userId),
            total: Number(total),
            orderItems: Number(orderItems)
        };
        const orders = await this.orderService.createOrder(data);
        successResponse(res, "order berhasil ditambakan", orders, null, 201);
    }
    async updateOrderHandler(req, res) {
        const order = await this.orderService.updateOrder(req.params.id, req.body);
        successResponse(res, "order berhasil di update", order);
    }
    async deleteOrderHandler(req, res) {
        const deleted = await this.orderService.deleteOrder(req.params.id);
        res.json({
            success: true,
            message: "Order berhasil dihapus",
            data: deleted
        });
    }
    async getstats(_req, res) {
        const stats = await this.orderService.exec();
        successResponse(res, "Statistik produk berhasil diambil", stats, null, 200);
    }
}
//# sourceMappingURL=order.controller.js.map
