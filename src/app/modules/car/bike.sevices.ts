import mongoose from 'mongoose'
import { Tcar } from './bike.interface'
import { Cars, Orders } from './bike.models'

type OrderType = {
  email: string
  product: string
  quantity: number
  totalPrice: number
  data?: object
}

const returnRevenuseServices = async () => {
  const result = await Orders.aggregate([
    {
      $project: {
        revenue: { $multiply: ['$quantity', '$totalPrice'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ])
  return result[0]
}

const orderCreate = async (reqBody: OrderType) => {

  const objectid = new mongoose.Types.ObjectId(reqBody.product);

  const result = await Orders.create(reqBody);


  await Cars.findOneAndUpdate(
    { _id: objectid },
    [
      {
        $set: {
          quantity: { $add: ['$quantity', -reqBody.quantity] },
          inStock: {
            $cond: {
              if: { $lte: [{ $add: ['$quantity', -reqBody.quantity] }, 0] },
              then: false,
              else: true,
            },
          },
        },
      },
    ],
    { new: true },
  )
  return result 
}

const createCarInDB = async (carData: Tcar) => {
  /*  const carDatsa = new Cars(carData)
  if (await carDatsa.isCarExists(carData.name)) {
    throw Error('car is alread exists!')
  }  */
  const result = await Cars.create(carData)

  const sanitizedResult = await Cars.findById(result._id).select('-id')

  return sanitizedResult
}

const getAllTheBikes = async (querys: Record<string, string>) => {
  const filters: Record<string, string> = { ...querys };

  const query: Record<string, { $regex: string; $options: string }> = {}
  Object.keys(filters).forEach((key: string) => {
    query[key] = { $regex: filters[key], $options: 'i' }
  })

  const result = await Cars.find(query)
  return result
}

const getSingleBike = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id)
  const result = await Cars.aggregate([{ $match: { _id: objectId } }]);
  if(!result[0]){
    return { status : false}
  }
  return result
}

//update a bike in this section and we are all here for this sectionn !!
const updataSingleBike = async (id: string, toUpdate: object) => {
  const objectId = new mongoose.Types.ObjectId(id)
  const result = await Cars.updateOne(
    { _id: objectId },
    { ...toUpdate, updated_at: new Date() },
  )
  if (result.modifiedCount === 1) {
    const result2 = await Cars.aggregate([{ $match: { _id: objectId } }])
    return result2
  }
}

const deleteSingleBike = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id)
  const result = await Cars.updateOne({ _id: objectId }, { isDeleted: true })
  return result
}

export const BikeServices = {
  createCarInDB,
  getAllTheBikes,
  getSingleBike,
  updataSingleBike,
  deleteSingleBike,
}
export const OrderServices = {
  orderCreate,
  returnRevenuseServices,
}
