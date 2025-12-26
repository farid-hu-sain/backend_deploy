import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import type { IOrderService } from "../services/order.service"


export interface IOrderController {
  getAllOrderHandler(req: Request, res: Response) : Promise<void>
  getOrderByIdHandler(req: Request, res: Response) : Promise<void>
  createOrderHandler(req: Request, res: Response) : Promise<void>
  updateOrderHandler(req: Request, res: Response) : Promise<void>
  deleteOrderHandler (req: Request, res: Response) : Promise<void>

}

export class OrderController implements IOrderController {
  constructor (private orderService : IOrderService) {
    this.getAllOrderHandler = this.getAllOrderHandler.bind(this)
    this.getOrderByIdHandler = this.getOrderByIdHandler.bind(this)
    this.createOrderHandler = this.createOrderHandler.bind(this)
    this.updateOrderHandler = this.updateOrderHandler.bind(this)
    this.deleteOrderHandler = this.deleteOrderHandler.bind(this)
    this.getstats = this.getstats.bind(this)
  }


async getAllOrderHandler  (req: Request, res: Response)  {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as any
    const sortBy = req.query.sortBy as string
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc' ) || 'desc'

    const result = await this.orderService.getAll({
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
        'Order berhasil ditambahkan',
        result.order,
        pagination
    )
    
}
async  getOrderByIdHandler (req: Request, res: Response)  {
    if (!req.params.id) {
       throw new Error('tidak ada param')
    }

    const order = await this.orderService.getOrderById(req.params.id)
    

    successResponse(
      res,
      "order sudah diambil",
      order
   )
}

async createOrderHandler (req: Request, res: Response )  {

    const { userId, total, orderItems} = req.body
    const data = {
      userId: Number(userId), 
      total: Number(total),
      orderItems: Number(orderItems) 
    }

    const orders = await this.orderService.createOrder(data)

  successResponse(
    res,
    "order berhasil ditambakan",
    orders,
    null,
    201
  )

}

async updateOrderHandler (req: Request, res: Response)  {
  const order = await this.orderService.updateOrder(req.params.id!, req.body)

  successResponse(
    res,
    "order berhasil di update",
    order
  );
}

async deleteOrderHandler  (req: Request, res: Response) {
  const deleted = await this.orderService.deleteOrder(req.params.id!)

  res.json({
    success: true,
    message: "Order berhasil dihapus",
    data: deleted
  });
}

async getstats(_req: Request, res: Response ){
  const stats =  await this.orderService.exec()

    successResponse(
      res,
      "Statistik produk berhasil diambil",
      stats,
      null,
      200
    )
}

}

