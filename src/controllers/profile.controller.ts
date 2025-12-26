import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IProfileService } from "../services/profile.service"


export interface IProfileController {
  getAllProfileHandler(req: Request, res: Response) : Promise<void>
  getProfileByIdHandler(req: Request, res: Response) : Promise<void>
  createProfileHandler(req: Request, res: Response) : Promise<void>
  updateProfileHandler(req: Request, res: Response) : Promise<void>
  deleteProfileHandler (req: Request, res: Response) : Promise<void>

}

export class ProfileController implements IProfileController {
  constructor (private profileService : IProfileService) {
    this.getAllProfileHandler = this.getAllProfileHandler.bind(this)
    this.getProfileByIdHandler = this.getProfileByIdHandler.bind(this)
    this.createProfileHandler = this.createProfileHandler.bind(this)
    this.updateProfileHandler = this.updateProfileHandler.bind(this)
    this.deleteProfileHandler = this.deleteProfileHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllProfileHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.profileService.getAll({
      page,
      limit,
      search,
      sortBy,
      sortOrder
    })

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages
    }

    successResponse(
        res,
        'Profile berhasil ditambahkan',
        result.profile,
        pagination
    )
    
}
async  getProfileByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const profile = await this.profileService.getProfileById(req.params.id)
    

    successResponse(
      res,
      "profile sudah diambil",
      profile
   )
}

async createProfileHandler (req: Request, res: Response )  {

  const file = req.file
  if (!file)throw new Error ('Image is required')
  const imageUrl = `/public/upload${file.filename}`

    const { name, gender, address, userId} = req.body
    const data = {
      name: name.toString(), 
      gender: gender.toString(), 
      address: address.toString(),
      profile_picture_url: imageUrl, 
      userId: Number(userId)
    }

    const profiles = await this.profileService.createProfile(data)

  successResponse(
    res,
    "profile berhasil ditambakan",
    profiles,
    null,
    201
  )

}

async updateProfileHandler (req: Request, res: Response)  {
  const profile = await this.profileService.updateProfile(req.params.id!, req.body)

  successResponse(
    res,
    "profile berhasil di update",
    profile
  );
}

async deleteProfileHandler  (req: Request, res: Response) {
  const deleted = await this.profileService.deleteProfile(req.params.id!)

  res.json({
    success: true,
    message: "Profile berhasil dihapus",
    data: deleted
  });
}
    async getstats(_req: Request, res: Response ){
  const stats =  await this.profileService.exec()

    successResponse(
      res,
      "Statistik produk berhasil diambil",
      stats,
      null,
      200
    )
}
}