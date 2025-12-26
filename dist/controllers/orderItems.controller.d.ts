import type { Request, Response } from "express";
import type { IOrderItemsService } from "../services/orderItems.service.js";
export interface IOrderItemsController {
    getAllOrderItemsHandler(req: Request, res: Response): Promise<void>;
    getOrderItemsByIdHandler(req: Request, res: Response): Promise<void>;
    createOrderItemsHandler(req: Request, res: Response): Promise<void>;
    updateOrderItemsHandler(req: Request, res: Response): Promise<void>;
    deleteOrderItemsHandler(req: Request, res: Response): Promise<void>;
}
export declare class OrderItemsController implements IOrderItemsController {
    private orderItemsService;
    constructor(orderItemsService: IOrderItemsService);
    getAllOrderItemsHandler(req: Request, res: Response): Promise<void>;
    getOrderItemsByIdHandler(req: Request, res: Response): Promise<void>;
    createOrderItemsHandler(req: Request, res: Response): Promise<void>;
    updateOrderItemsHandler(req: Request, res: Response): Promise<void>;
    deleteOrderItemsHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=orderItems.controller.d.ts.map
