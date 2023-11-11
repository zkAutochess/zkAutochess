import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '@hapi/joi'

export class ErrorWithHttpCode extends Error {
  httpCode: number

  constructor(message: string, httpCode: number) {
    super(message)
    this.httpCode = httpCode
    this.name = 'ErrorWithHttpCode'
  }
}

export const ErrorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({
      type: 'ValidationError',
      details: (error as ValidationError).details,
    })
  }

  res.status(error.httpCode ?? 400).send(error.message)
}
