import { NextFunction, Request, Response } from "express"
import { IProduct } from "./interfaces"
import market from "./database"

const verifyIfIdExists = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { productId } = request.params
  const foundProduct: IProduct | undefined = market.find(
    (value: IProduct): boolean => value.id === Number(productId)
  )

  if (!foundProduct) {
    return response.status(404).json({ error: "Product does not exists." })
  }
  response.locals = {
    ...response.locals,
    foundProduct,
    productIndex: market.indexOf(foundProduct)
  }
  return next()
}

const verifyIfNameExists = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const req = request.body

  if (req.length) {
    req.forEach((product: any) => {
      const NameSearch: IProduct | undefined = market.find((value) => value.name === product.name)
      if (NameSearch) {
        return response.status(409).json({ error: "Product already exists." })
      }
    })
    const NameSearch: IProduct | undefined = market.find((value) => value.name === req.name)
    if (NameSearch) {
      return response.status(409).json({ error: "Product already exists." })
    }
  }

  return next()
}
export default { verifyIfIdExists, verifyIfNameExists }
