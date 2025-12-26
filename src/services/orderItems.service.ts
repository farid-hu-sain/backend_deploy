import type { Prisma, OrderItems} from "../generated/client"
import type { IOrderItemsRepository } from "../repository/orderItems.repository"

interface FindAllParams {
  page: number
  limit: number
  search?: {
    orderId?: number,
    productId?: number,
  }
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface OrderItemsListRespone{
    orderItems:OrderItems[], 
    total: number, 
    totalPages: number, 
    currentPage: number 
}
export interface IOrderItemsService {
  getAll(params: FindAllParams) : Promise <OrderItemsListRespone>
  getOrderItemsById (id: string): Promise<OrderItems | null>;
  createOrderItems(data: {orderId: number, productId: number, quantity: number, priceAtTime: number}): Promise<OrderItems> 
  updateOrderItems(id: string, data: Partial<OrderItems>) : Promise <OrderItems>
  deleteOrderItems(id: string) : Promise<OrderItems>
  exec(): Promise<{ overview: any, byCategory: any}>
}

export class OrderItemsService implements IOrderItemsService { 
    constructor (private orderItemsRepo: IOrderItemsRepository) {}

       async getAll (params: FindAllParams) : Promise<OrderItemsListRespone>  {
    const { page, limit, search, sortBy, sortOrder} = params

    const skip = (page - 1 ) * limit
    
    const whereClause : Prisma.OrderItemsWhereInput = {
      deletedAt : null
    }

    if (search?.orderId){whereClause.orderId = search.orderId}
    if (search?.productId){whereClause.productId = search.productId}

    const sortCriteria :  Prisma.OrderItemsOrderByWithRelationInput = sortBy ? { [sortBy] : sortOrder || "desc" } : {createdAt: "desc"}

    const orderItems = await this.orderItemsRepo.list(skip, limit, whereClause, sortCriteria)
    
    const total = await this.orderItemsRepo.countAll(whereClause)


    return { 
      orderItems,
      total, 
      totalPages: Math.ceil( total/limit), 
      currentPage: page }
}


  async getOrderItemsById (id: string): Promise<OrderItems | null>{  
const numId = parseInt (id)


const orderItems = await this.orderItemsRepo.findById(numId)
    if (!orderItems) {
     throw new Error ('OrderItems tidak ditemukan')
    }

return orderItems
}


    async createOrderItems (data: {orderId: number, productId: number, quantity: number, priceAtTime: number}) : Promise<OrderItems>  {
      return await this.orderItemsRepo.create({
        ...data,
        order : {connect: { id: data.orderId}},
        product: { connect: {id: data.productId}}
      })
}


    async updateOrderItems  (id: string, data : Partial<OrderItems>) : Promise<OrderItems>  {
  await this.getOrderItemsById(id)

  const numId = parseInt(id)

  return await this.orderItemsRepo.update(numId, data)
}

    async deleteOrderItems  (id: string)  {
const numId = parseInt (id)

    return await this.orderItemsRepo.softDelete(numId)
}
    async exec() {
    const stats = await this.orderItemsRepo.getStats()
    const CategoryStats = await this.orderItemsRepo.getByCategoryStats()

    return {
      overview: stats,
      byCategory: CategoryStats
    }
  }
}