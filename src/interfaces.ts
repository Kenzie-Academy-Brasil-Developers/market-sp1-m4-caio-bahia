interface IProduct {
  id: number
  name: string
  price: number
  weight: number
  section: TSection
  expirationDate: Date
}

type TSection = "food" | "cleaning"

type TProductCreate = Omit<IProduct, "id">
type TProductUpdate = Partial<TProductCreate>

export { TSection, TProductCreate, TProductUpdate, IProduct }
