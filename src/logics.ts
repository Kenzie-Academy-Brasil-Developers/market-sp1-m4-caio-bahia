import { Request, Response, request } from "express"
import { IProduct, TProductCreate } from "./interfaces"
import database from "./database"

// const getId = (): number => {
//   const lastItem: IProduct | undefined = database.sort((a, b): number => a.id - b.id).at(-1)
//   if (!lastItem) {
//     return 1
//   }
//   return lastItem.id + 1
// }

let idCounter: number = 1

const createProducts = (request: Request, response: Response): Response => {
  const payload: IProduct[] = request.body

  let allProducts: IProduct[] = []

  const date = new Date()
  date.setDate(date.getDate() + 365)

  payload.map((product: TProductCreate) => {
    const newproduct: IProduct = { id: idCounter, ...product, expirationDate: date }
    allProducts.push(newproduct)
    database.push(newproduct)
    idCounter++
  })
  const totalValue = database.reduce(
    (previusValue, currentValue) => previusValue + currentValue.price,
    0
  )
  const productResponse = {
    total: totalValue,
    marketProducts: allProducts
  }

  return response.status(201).json(productResponse)
}

const getAllProducts = (request: Request, response: Response): Response => {
  return response.status(200).json(database)
}

const getProductById = (request: Request, response: Response): Response => {
  const { productId } = request.params
  const findProduct = database.find((product) => product.id == Number(productId))
  return response.status(200).json(findProduct)
}

export default { createProducts, getAllProducts, getProductById }
