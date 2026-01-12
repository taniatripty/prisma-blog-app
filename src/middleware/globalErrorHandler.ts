import e, { NextFunction, Request, Response } from "express"
import { error } from "node:console"
import { Prisma } from "../../generated/prisma/client";

function errorHandler (err:any, req:Request, res:Response, next:NextFunction) {
  let statusCode = 500;
    let errorMessage = "Internal Server Error";
    let errorDetails = err;
    if( err instanceof Prisma.PrismaClientValidationError){
        statusCode=400;
        errorMessage='you provide incorrect field type or missing field'
    }
  res.status(statusCode)
  res.json({
    message:errorMessage,
    error:errorDetails
  })
}
export default errorHandler