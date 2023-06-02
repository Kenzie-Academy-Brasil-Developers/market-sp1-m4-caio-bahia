interface IProduct {
  id: number
  name: string
  price: number
  weight: number
  section: TSection
  expirationDate: Date
}

type TSection = "food" | "cleaning"

type TProductCreate = Omit<IProduct, "id" | "expirationDate">
type TProductUpdate = Partial<TProductCreate>

export interface ICleaningProduct extends IProduct {}
export interface IFoodProduct extends IProduct {
  calories: number
}

export { TSection, TProductCreate, TProductUpdate, IProduct }
