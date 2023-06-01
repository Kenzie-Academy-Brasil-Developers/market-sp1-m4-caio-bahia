import { Request, Response } from "express"
import { IProduct, TProductCreate } from "./interfaces"
import database from "./database"

const getId = (): number => {
  const lastItem: IProduct | undefined = database.sort((a, b): number => a.id - b.id).at(-1)
  if (!lastItem) {
    return 1
  }
  return lastItem.id + 1
}
const create = (request: Request, response: Response): Response => {
  const payload: TProductCreate = request.body
  const newProduct: IProduct = { ...payload, id: getId() }

  database.push(newProduct)

  return response.status(201).json(newProduct)
}

const read = (request: Request, response: Response): Response => {
  return response.status(200).json(database)
}

export default { create, read }
