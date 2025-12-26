import type { Category, Prisma, Product} from "../generated"
import type { IProductRepository } from "../repository/product.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    name?: string,
    max_price?: number,
    min_price?: number
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface ProductListRespone{
    product:Product[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IProductService {
  getAll(params: FindAllParams) : Promise <ProductListRespone>
  getProductById (id: string) : Promise<Category | null & Product | null>;
  createProduct(data: {name: string, descrption?: string, price: number, stock: number, image: string, cateoryId?: number }): Promise<Product> 
  updateProduct(id: string, data: Partial<Product>) : Promise <Product>
  deleteProduct(id: string) : Promise<Product>
  exec(): Promise<{ overview: any, byCategory: any}>
}

export class ProductService implements IProductService { 
    constructor (private productRepo: IProductRepository) {}

       async getAll (params: FindAllParams) : Promise<ProductListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.ProductWhereInput = {
      deletedAt : null
    }

    if (search?.name){whereClause.name = { contains: search.name, mode: "insensitive"}}
    if (search?.min_price) {whereClause.price = { gte : search.min_price}}
    if (search?.max_price) {whereClause.price = {lte : search.max_price}}

    const sortCriteria :  Prisma.ProductOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const product = await this.productRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.productRepo.countAll(whereClause)


    return { 
      product,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getProductById (id: string) : Promise<Category | null & Product | null> {  
const numId = parseInt (id)


const product = await this.productRepo.findById(numId)
    if (!product) {
     throw new Error ('Product tidak ditemukan')
    }

return product
}


    async createProduct (data: {name: string, description: string, price: number, stock: number, image: string}) : Promise<Product>  {
      return await this.productRepo.create(data)
}


    async updateProduct  (id: string, data : Partial<Product>) : Promise<Product>  {
  await this.getProductById(id)

  const numId = parseInt(id)

  return await this.productRepo.update(numId, data)
}

    async deleteProduct  (id: string)  {
const numId = parseInt (id)

    return await this.productRepo.softDelete(numId)
}

  async exec() {
    const stats = await this.productRepo.getStats()
    const CategoryStats = await this.productRepo.getProductsByCategoryStats()

    return {
      overview: stats,
      byCategory: CategoryStats
    }
  }
}