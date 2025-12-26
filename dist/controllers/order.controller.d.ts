import type { Request, Response } from "express";
import type { IOrderService } from "../services/order.service.js";
export interface IOrderController {
    getAllOrderHandler(req: Request, res: Response): Promise<void>;
    getOrderByIdHandler(req: Request, res: Response): Promise<void>;
    createOrderHandler(req: Request, res: Response): Promise<void>;
    updateOrderHandler(req: Request, res: Response): Promise<void>;
    deleteOrderHandler(req: Request, res: Response): Promise<void>;
}
export declare class OrderController implements IOrderController {
    private orderService;
    constructor(orderService: IOrderService);
    getAllOrderHandler(req: Request, res: Response): Promise<void>;
    getOrderByIdHandler(req: Request, res: Response): Promise<void>;
    createOrderHandler(req: Request, res: Response): Promise<void>;
    updateOrderHandler(req: Request, res: Response): Promise<void>;
    deleteOrderHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=order.controller.d.ts.map
