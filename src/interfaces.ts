interface IProduct {
  id: number
  name: string
  price: number
  weight: number
  section: TSection
  calories?: number
  expirationDate: Date
}

type TSection = "food" | "cleaning"

type TProductCreate = Omit<IProduct, "id" | "expirationDate">
type TProductUpdate = Partial<IFoodProduct>
type ICleaningProduct = Omit<IProduct, "calories">

export interface IFoodProduct extends IProduct {}

export { TSection, TProductCreate, TProductUpdate, IProduct, ICleaningProduct }
