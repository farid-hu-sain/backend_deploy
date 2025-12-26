import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { ICategoryService } from "../services/category.service"


export interface ICategoryController {
  getAllCategoryHandler(req: Request, res: Response) : Promise<void>
  getCategoryByIdHandler(req: Request, res: Response) : Promise<void>
  createCategoryHandler(req: Request, res: Response) : Promise<void>
  updateCategoryHandler(req: Request, res: Response) : Promise<void>
  deleteCategoryHandler (req: Request, res: Response) : Promise<void>

}

export class CategoryController implements ICategoryController {
  constructor (private categoryService : ICategoryService) {
    this.getAllCategoryHandler = this.getAllCategoryHandler.bind(this)
    this.getCategoryByIdHandler = this.getCategoryByIdHandler.bind(this)
    this.createCategoryHandler = this.createCategoryHandler.bind(this)
    this.updateCategoryHandler = this.updateCategoryHandler.bind(this)
    this.deleteCategoryHandler = this.deleteCategoryHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllCategoryHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.categoryService.getAll({
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
        'Category berhasil ditambahkan',
        result.category,
        pagination
    )
    
}
async  getCategoryByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const category = await this.categoryService.getCategoryById(req.params.id)
    

    successResponse(
      res,
      "category sudah diambil",
      category
   )
}

async createCategoryHandler (req: Request, res: Response )  {

    const { name} = req.body
    const data = {
      name: name.toString() 
    }

    const categorys = await this.categoryService.createCategory(data)

  successResponse(
    res,
    "category berhasil ditambakan",
    categorys,
    null,
    201
  )

}

async updateCategoryHandler (req: Request, res: Response)  {
  const category = await this.categoryService.updateCategory(req.params.id!, req.body)

  successResponse(
    res,
    "category berhasil di update",
    category
  );
}

async deleteCategoryHandler  (req: Request, res: Response) {
  const deleted = await this.categoryService.deleteCategory(req.params.id!)

  res.json({
    success: true,
    message: "Category berhasil dihapus",
    data: deleted
  });
}

  async getstats(_req: Request, res: Response ){
  const stats =  await this.categoryService.exec()

    successResponse(
      res,
      "Statistik produk berhasil diambil",
      stats,
      null,
      200
    )
}
}