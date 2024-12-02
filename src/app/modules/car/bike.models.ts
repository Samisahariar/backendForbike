import { model, Schema } from 'mongoose'
import { CarExistsMethods, CarModel, Tcar, TOrder } from './bike.interface'

const carSchema = new Schema<Tcar, CarModel, CarExistsMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    },
    description: {
      type: String,
      max: 30,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
)

const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date },
})

carSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date()
  }
  this.updated_at = new Date()
  next()
})


orderSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date()
  }
  this.updated_at = new Date()
  next()
})

carSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

carSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } })
  next()
})

carSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

carSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString() // Convert ObjectId to string
    delete ret.id // Remove id field
    return ret
  },
})
/* carSchema.post('aggregate', function (doc, next) {
  console.log(doc)
  next()
}) */

carSchema.set('toJSON', { virtuals: true })
carSchema.set('toObject', { virtuals: true })

/* carSchema.virtual('update_at').get(function () {
  return new Date()
}) */

export const Orders = model<TOrder>('order', orderSchema)
export const Cars = model<Tcar, CarModel>('car', carSchema)
