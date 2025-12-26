import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/response";
import { Prisma } from "../generated/client";

export const errorHandler = (err: Error, _req: Request, res: Response, _next : NextFunction) => {
  console.error('ERROR:', err.message);

  const statusCode = err.message.includes('tidak ditemukan') ? 404 :400

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if(err.code === 'P2002') {
        return errorResponse (
          res,
          err.message,
          statusCode,
          process.env.NODE_ENV === 'development' ? {stack: err.stack} as {stack?: string} : null
        )
      }

      if (err.code === 'P2025') {
        return errorResponse (
          res,
          `data tidak ditemukan \n${err.message}`,
          statusCode,
          process.env.NODE_ENV === 'development' ? { stack: err.stack} as {stack? : string } : null
        )
      }


    }
    
    return errorResponse (
    res,
    err.message || 'terjadi kesalahan',
    statusCode,
    process.env.NODE_ENV === 'development' ? { stack: err.stack } as { stack? : string } : null
  )
}