import { ErrorRequestHandler } from "express";
import { Prisma } from "../../generated/prisma/client";

function getHttpStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const statusCode = "statusCode" in error ? error.statusCode : undefined;
  const status = "status" in error ? error.status : undefined;
  const candidate = statusCode ?? status;

  return typeof candidate === "number" &&
    Number.isInteger(candidate) &&
    candidate >= 400 &&
    candidate <= 599
    ? candidate
    : undefined;
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  let statusCode = getHttpStatus(error) ?? 500;
  let message =
    error instanceof Error ? error.message : "Internal Server Error";

  if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid request data.";
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "A record with this value already exists.";
        break;
      case "P2003":
        statusCode = 400;
        message = "The request references a record that does not exist.";
        break;
      case "P2025":
        statusCode = 404;
        message = "The requested record was not found.";
        break;
      case "P2014":
        statusCode = 400;
        message = "The request violates a required relation.";
        break;
      default:
        statusCode = 500;
        message = "Internal Server Error";
    }
  } else if (statusCode >= 500) {
    message = "Internal Server Error";
  }

  if (statusCode >= 500) {
    console.error("Unhandled request error:", error);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
