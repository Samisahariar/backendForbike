import { z } from 'zod'
export const ordervalidationSchema = z.object({
  email: z.string().email(),
  product: z.string(),
  quantity: z.number(),
  totalPrice: z.number(),
})

export default ordervalidationSchema
