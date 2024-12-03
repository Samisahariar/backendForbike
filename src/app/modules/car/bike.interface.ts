import { Model } from 'mongoose'

export type Tcar = {
  name: string
  brand: string
  price: number
  category: string
  description: string
  quantity: number
  inStock: boolean
  created_at?: Date
  updated_at?: Date
  isDeleted ? : boolean
}



export type TOrder = {
  email: string
  product: string
  quantity: number
  totalPrice: number
  created_at?: Date
  updated_at?: Date
}


export interface CarExistsMethods {
  isCarExists(name: string): Promise<Tcar | null>
}



export type BikeModel = Model<Tcar, Record<string, never>, CarExistsMethods>
