import { NextFunction, Request, Response } from "express"
import { IProduct } from "./interfaces"
import database from "./database"

const verifyIfIdExists = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { productId } = request.params
  const foundProduct: IProduct | undefined = database.find(
    (value: IProduct): boolean => value.id === Number(productId)
  )

  if (!foundProduct) {
    return response.status(404).json({ error: "Product does not exists." })
  }
  response.locals = {
    ...response.locals,
    foundProduct,
    productIndex: database.indexOf(foundProduct)
  }
  return next()
}
const verifyIfNameExists = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { name } = request.body

  if (!name) return next()

  const foundName: IProduct | undefined = database.find(
    (value: IProduct): boolean => value.name === String(name)
  )
  if (foundName) {
    return response.status(409).json({ error: "Product already exists." })
  }
  return next()
}
export default { verifyIfIdExists, verifyIfNameExists }
