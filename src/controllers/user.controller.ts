import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IUserService } from "../services/user.service"


export interface IUserController {
  getAllUserHandler(req: Request, res: Response) : Promise<void>
  getUserByIdHandler(req: Request, res: Response) : Promise<void>
  createUserHandler(req: Request, res: Response) : Promise<void>
  updateUserHandler(req: Request, res: Response) : Promise<void>
  deleteUserHandler (req: Request, res: Response) : Promise<void>

}

export class UserController implements IUserController {
  constructor (private userService : IUserService) {
    this.getAllUserHandler = this.getAllUserHandler.bind(this)
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this)
    this.createUserHandler = this.createUserHandler.bind(this)
    this.updateUserHandler = this.updateUserHandler.bind(this)
    this.deleteUserHandler = this.deleteUserHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllUserHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.userService.getAll({
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
        'User berhasil ditambahkan',
        result.user,
        pagination
    )
    
}
async  getUserByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const user = await this.userService.getUserById(req.params.id)
    

    successResponse(
      res,
      "user sudah diambil",
      user
   )
}

async createUserHandler (req: Request, res: Response )  {

    const { username, email, password_hash, role} = req.body
    const data = {
      username: username.toString(), 
      email: email.toString(), 
      password_hash: password_hash.toString(), 
      role: role.toString
    }

    const users = await this.userService.createUser(data)

  successResponse(
    res,
    "user berhasil ditambakan",
    users,
    null,
    201
  )

}

async updateUserHandler (req: Request, res: Response)  {
  const user = await this.userService.updateUser(req.params.id!, req.body)

  successResponse(
    res,
    "user berhasil di update",
    user
  );
}

async deleteUserHandler  (req: Request, res: Response) {
  const deleted = await this.userService.deleteUser(req.params.id!)

  res.json({
    success: true,
    message: "User berhasil dihapus",
    data: deleted
  });
}

  async getstats(_req: Request, res: Response ){
  const stats =  await this.userService.exec()

    successResponse(
      res,
      "Statistik produk berhasil diambil",
      stats,
      null,
      200
    )
}

}