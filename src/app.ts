import express, { type Application, type NextFunction, type Request, type Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'
import {  successResponse } from "./utils/response";
import { errorHandler } from "./middlewares/error.handler";
import userRouter from "./routes/user.route"
import categoryRouter from "./routes/category.routes"
import orderRouter from "./routes/order.routes"
import orderItemRouter from "./routes/orderItems.routes"
import productRouter from "./routes/product.route"
import authRouter from "./routes/auth.route"
import profileRouter from "./routes/profile.route"
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./utils/swagger";

const app: Application = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.set('query panser', 'extended')
app.use(express.static("public"))


app.use ((req: Request, _res: Response, next: NextFunction ) => {
  console.log(`Request masuk: ${req.method}:${req.path}`);
  req.startTime = Date.now()
  next()
})


app.get('/', (_req: Request, res: Response) => {
    successResponse (
      res,
      "selamat datang di API web halaman ecommerce",
    {   hari : 3,
        status: 'server Hidup',
    },
  )
})
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

// app.get('/api-docs', (_req:Request, res: Response) => {
//   res.redirect('/api-docs')
// })
app.use('/api/product', productRouter)
app.use('/api/category', categoryRouter)
app.use('/api/order', orderRouter)
app.use('/api/orderItem', orderItemRouter)
app.use('/api/user', userRouter )
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)


app.get(/.*/, (req: Request, _res: Response) => {
 throw new Error(`Route ${req.originalUrl} tidak ada di API halaman ecommerce`)
})

app.use(errorHandler)

export default app