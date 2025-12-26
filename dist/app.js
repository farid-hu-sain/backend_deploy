import express, {} from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { successResponse } from "./utils/response.js";
import { errorHandler } from "./middlewares/error.handler.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.routes.js";
import orderRouter from "./routes/order.routes.js";
import orderItemRouter from "./routes/orderItems.routes.js";
import productRouter from "./routes/product.route.js";
import authRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.route.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.js";
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.set("query panser", "extended");
app.use(express.static("public"));
app.use((req, _res, next) => {
    console.log(`Request masuk: ${req.method}:${req.path}`);
    req.startTime = Date.now();
    next();
});
app.get("/", (_req, res) => {
    successResponse(res, "selamat datang di API web halaman ecommerce", { hari: 3, status: "server Hidup",
    });
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// app.get('/api-docs', (_req:Request, res: Response) => {
//   res.redirect('/api-docs')
// })
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/order", orderRouter);
app.use("/api/orderItem", orderItemRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.get(/.*/, (req, _res) => {
    throw new Error(`Route ${req.originalUrl} tidak ada di API halaman ecommerce`);
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map
