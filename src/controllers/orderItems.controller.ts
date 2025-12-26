import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IOrderItemsService } from "../services/orderItems.service"


export interface IOrderItemsController {
  getAllOrderItemsHandler(req: Request, res: Response) : Promise<void>
  getOrderItemsByIdHandler(req: Request, res: Response) : Promise<void>
  createOrderItemsHandler(req: Request, res: Response) : Promise<void>
  updateOrderItemsHandler(req: Request, res: Response) : Promise<void>
  deleteOrderItemsHandler (req: Request, res: Response) : Promise<void>

}

export class OrderItemsController implements IOrderItemsController {
  constructor (private orderItemsService : IOrderItemsService) {
    this.getAllOrderItemsHandler = this.getAllOrderItemsHandler.bind(this)
    this.getOrderItemsByIdHandler = this.getOrderItemsByIdHandler.bind(this)
    this.createOrderItemsHandler = this.createOrderItemsHandler.bind(this)
    this.updateOrderItemsHandler = this.updateOrderItemsHandler.bind(this)
    this.deleteOrderItemsHandler = this.deleteOrderItemsHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllOrderItemsHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.orderItemsService.getAll({
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
        'OrderItems berhasil ditambahkan',
        result.orderItems,
        pagination
    )
    
}
async  getOrderItemsByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const orderItems = await this.orderItemsService.getOrderItemsById(req.params.id)
    

    successResponse(
      res,
      "orderItems sudah diambil",
      orderItems
   )
}

async createOrderItemsHandler (req: Request, res: Response )  {

    const { quantity, priceAtTime, productId, OrderId} = req.body
    const data = {
      orderId: Number(OrderId),
      productId: Number(productId),
      quantity: Number(quantity), 
      priceAtTime: Number(priceAtTime), 
    }

    const orderItemss = await this.orderItemsService.createOrderItems(data)

  successResponse(
    res,
    "orderItems berhasil ditambakan",
    orderItemss,
    null,
    201
  )

}

async updateOrderItemsHandler (req: Request, res: Response)  {
  const orderItems = await this.orderItemsService.updateOrderItems(req.params.id!, req.body)

  successResponse(
    res,
    "orderItems berhasil di update",
    orderItems
  );
}

async deleteOrderItemsHandler  (req: Request, res: Response) {
  const deleted = await this.orderItemsService.deleteOrderItems(req.params.id!)

  res.json({
    success: true,
    message: "OrderItems berhasil dihapus",
    data: deleted
  });
}

async getstats(_req: Request, res: Response ){
  const stats =  await this.orderItemsService.exec()

    successResponse(
      res,
      "Statistik produk berhasil diambil",
      stats,
      null,
      200
    )
}

}