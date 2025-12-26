import type { Request, Response } from "express";
import type { IUserService } from "../services/user.service.js";
export interface IUserController {
    getAllUserHandler(req: Request, res: Response): Promise<void>;
    getUserByIdHandler(req: Request, res: Response): Promise<void>;
    createUserHandler(req: Request, res: Response): Promise<void>;
    updateUserHandler(req: Request, res: Response): Promise<void>;
    deleteUserHandler(req: Request, res: Response): Promise<void>;
}
export declare class UserController implements IUserController {
    private userService;
    constructor(userService: IUserService);
    getAllUserHandler(req: Request, res: Response): Promise<void>;
    getUserByIdHandler(req: Request, res: Response): Promise<void>;
    createUserHandler(req: Request, res: Response): Promise<void>;
    updateUserHandler(req: Request, res: Response): Promise<void>;
    deleteUserHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map
