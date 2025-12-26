import type { Request, Response } from "express";
import type { IProductService } from "../services/product.service.js";
export interface IProductController {
    getAllProductHandler(req: Request, res: Response): Promise<void>;
    getProductByIdHandler(req: Request, res: Response): Promise<void>;
    createProductHandler(req: Request, res: Response): Promise<void>;
    updateProductHandler(req: Request, res: Response): Promise<void>;
    deleteProductHandler(req: Request, res: Response): Promise<void>;
    getstats(req: Request, res: Response): Promise<void>;
}
export declare class ProductController implements IProductController {
    private productService;
    constructor(productService: IProductService);
    getAllProductHandler(req: Request, res: Response): Promise<void>;
    getProductByIdHandler(req: Request, res: Response): Promise<void>;
    createProductHandler(req: Request, res: Response): Promise<void>;
    updateProductHandler(req: Request, res: Response): Promise<void>;
    deleteProductHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=product.controller.d.ts.map
