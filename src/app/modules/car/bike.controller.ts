import { Request, Response } from 'express'
import carValidationSchema from './bike.validation'
import { BikeServices, OrderServices } from './bike.sevices'
import ordervalidationSchema from './order.validation'
import { z } from 'zod'

const createBikeData = async (req: Request, res: Response) => {
  let bike: object
  try {
    bike = req.body.bike
    // Validate and parse the input data
    const parsedBikeValidationData = carValidationSchema.parse(bike)
    // Save the parsed data to the database
    const result = await BikeServices.createCarInDB(parsedBikeValidationData)

    res.status(200).json({
      message: 'Bike Created Successfully !',
      status: true,
      data: result,
    })
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const restOftheError: Record<string, any> = {}

      err.errors.forEach(eachError => {
        /* const value: number | string = Object(eachError).recevied */

        const errorType =
          eachError.code === 'too_small' ? 'min' : eachError.code

        const field = String(eachError.path[0])

        restOftheError[`${field}`] = {
          message: eachError.message,
          name: 'validation Error',
          properties: {
            message: eachError.message,
            type: errorType,
            min: errorType === 'min' ? 0 : undefined,
          },
          kind: errorType,
          path: field,
          value: bike[field],
        }
      })

      const formatedError = {
        message: 'validation Failed !',
        success: false,
        error: {
          name: 'validation failed',
          errors: restOftheError,
        },
        stack: err.stack,
      }
      res.status(400).json(formatedError)
    }
  }
}

//get all the cars api call is here and all the code
const getAllTheCarController = async (req: Request, res: Response) => {
  try {
    const query: Record<string, string> = {}
    Object.keys(req.query).forEach(key => {
      const value = req.query[key]
      if (typeof value === 'string') {
        query[key] = value
      }
    })
    const result = await BikeServices.getAllTheBikes(query)
    res.status(200).json({
      message: 'Bikes retrieved  succesfully !!',
      status: true,
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error

    res.status(400).json({
      status: false,
      message:
        error.message ||
        'something went wrong when data is rethriving from the database !!',
      error: err,
    })
  }
}

//get the single bike
const getTheSingleBIke = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await BikeServices.getSingleBike(id)

    res.status(200).json({
      message: 'Bikes retrieved  succesfully !!',
      status: true,
      data: result,
    })
  } catch (err) {
    const error = err as Error

    if (error.name == 'ZodError') {
      res.status(400).json({
        message: 'Validation Failed',
        status: false,
        error: error,
      })
    }
  }
}

///update a single bike
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const toUpdate = req.body
    const result = await BikeServices.updataSingleBike(id, toUpdate)
    res.status(200).json({
      message: 'updated Succesfully !!',
      status: true,
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error

    res.status(400).json({
      status: false,
      message:
        error.message ||
        'something went wrong when data is rethriving from the database !!',
      error: err,
    })
  }
}

//delete single car data from the database and all of the sequence !!
const deleteSingleDataController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await BikeServices.deleteSingleBike(id)
    res.status(200).json({
      message: 'Bike destatusfully !!',
      status: true,
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error
    res.status(400).json({
      message: error.message || 'something wrong !',
      status: false,
      error: error,
    })
  }
}

//order create in the database alongwith the product details
const createOrderController = async (req: Request, res: Response) => {
  let order: object
  try {
    order  = req.body.order
    const validateOrderData = ordervalidationSchema.parse(order)
    const result = await OrderServices.orderCreate(validateOrderData)

    res.status(200).json({
      message: 'order created succesfully !!',
      status: true,
      data: result,
    })

  } catch (err) {
    if (err instanceof z.ZodError) {
      const restOftheError: Record<string, any> = {}

      err.errors.forEach(eachError => {

        /* const value: number | string = Object(eachError).recevied */

        const errorType =
          eachError.code === 'too_small' ? 'min' : eachError.code

        const field = String(eachError.path[0])

        restOftheError[`${field}`] = {
          message: eachError.message,
          name: 'validation Error',
          properties: {
            message: eachError.message,
            type: errorType,
            min: errorType === 'min' ? 0 : undefined,
          },
          kind: errorType,
          path: field,
          value: order[field]
        }
      })

      const formatedError = {
        message: 'validation Failed !',
        success: false,
        error: {
          name: 'validation failed',
          errors: restOftheError,
        },
        stack: err.stack,
      }
      res.status(400).json(formatedError)
    }else{
      res.status(500).json({
        message : "internaml ServerError",
        status : false,

      })
    }
  }
}

//returns only the revenues here is the api !!
const returnRevenuseController = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.returnRevenuseServices()
    if (result.status) {
      res.status(400).json({
        messsage: 'There is no specific data relatedd to this id',
        status: false,
      })
    }
    res.status(200).json({
      message: 'Revenue calculated successfully !!',
      status: true,
      data: result,
    })
  } catch (err) {
    const error = err as Error

    res.status(400).json({
      message: error.message || 'something wrong !',
      status: false,
      error: err,
    })
  }
}

export const BikeController = {
  createBikeData,
  getAllTheCarController,
  getTheSingleBIke,
  updateSingleBike,
  deleteSingleDataController,
}
export const OrderController = {
  createOrderController,
  returnRevenuseController,
}
