import { Request, Response, request } from "express"
import { IProduct, TProductCreate, TProductUpdate } from "./interfaces"
import market from "./database"

let idCounter: number = 1

const createProducts = (request: Request, response: Response): Response => {
  const payload: IProduct[] = request.body

  let allProducts: IProduct[] = []

  const date: Date = new Date()
  date.setDate(date.getDate() + 365)

  payload.map((product: TProductCreate) => {
    const newproduct: IProduct = { id: idCounter, ...product, expirationDate: date }
    allProducts.push(newproduct)
    market.push(newproduct)
    idCounter++
  })
  const totalValue: number = market.reduce(
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
  return response.status(200).json(market)
}

const getProductById = (request: Request, response: Response): Response => {
  const { productId } = request.params
  const findProduct = market.find((product) => product.id == Number(productId))
  return response.status(200).json(findProduct)
}

const updateProduct = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals
  const payload: TProductUpdate = request.body

  if (payload.name) {
    market[productIndex].name = payload.name
  }
  if (payload.price) {
    market[productIndex].price = payload.price
  }
  if (payload.weight) {
    market[productIndex].weight = payload.weight
  }
  if (payload.calories) {
    market[productIndex].calories = payload.calories
  }

  return response.status(200).json(market[productIndex])
}

const deleteProduct = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals

  market.splice(Number(productIndex), 1)

  return response.status(204).json()
}

export default { createProducts, getAllProducts, getProductById, updateProduct, deleteProduct }
