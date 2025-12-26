import type { Request, Response } from "express";
import type { IProfileService } from "../services/profile.service.js";
export interface IProfileController {
    getAllProfileHandler(req: Request, res: Response): Promise<void>;
    getProfileByIdHandler(req: Request, res: Response): Promise<void>;
    createProfileHandler(req: Request, res: Response): Promise<void>;
    updateProfileHandler(req: Request, res: Response): Promise<void>;
    deleteProfileHandler(req: Request, res: Response): Promise<void>;
}
export declare class ProfileController implements IProfileController {
    private profileService;
    constructor(profileService: IProfileService);
    getAllProfileHandler(req: Request, res: Response): Promise<void>;
    getProfileByIdHandler(req: Request, res: Response): Promise<void>;
    createProfileHandler(req: Request, res: Response): Promise<void>;
    updateProfileHandler(req: Request, res: Response): Promise<void>;
    deleteProfileHandler(req: Request, res: Response): Promise<void>;
    getstats(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=profile.controller.d.ts.map
