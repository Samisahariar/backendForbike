import {Request, Response } from 'express'
import carValidationSchema from './bike.validation'
import { CarServices, OrderServices } from './bike.sevices'
import ordervalidationSchema from './order.validation'


const createBikeData = async (req: Request, res: Response) => {
  try {
    const { car } = req.body
    // Validate and parse the input data
    const parsedCarValidationData = carValidationSchema.parse(car)

    // Save the parsed data to the database
    const result = await CarServices.createCarInDB(parsedCarValidationData)

    res.status(200).json({
      message: 'Bike Created Successfully !',
      status: true,
      data: result,
    })
  } catch (err: unknown) {
    const error = err as Error
    res.status(400).json({
      status: false,
      message:
        error.message ||
        'something went wrong when data is inserted to the database !!',
      error: err,
    })
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
    const result = await CarServices.getAllTheBikes(query)
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
    const result = await CarServices.getSingleBike(id)

    res.status(200).json({
      message: 'Bikes retrieved  succesfully !!',
      status: true,
      data: result,
    })
  } catch (err) {
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

///update a single bike
const updateSingleBike = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const toUpdate = req.body
    const result = await CarServices.updataSingleBike(id, toUpdate);
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
    const result = await CarServices.deleteSingleBike(id)
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
  try {
    const { order } = req.body;

    const validateOrderData = ordervalidationSchema.parse(order);
    const result = await OrderServices.orderCreate(validateOrderData);

    res.status(200).json({
      message: 'order created succesfully !!',
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
//returns only the revenues here is the api !!
const returnRevenuseController = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.returnRevenuseServices();
    if(result.status){
      res.status(400).json({
        messsage : "There is no specific data relatedd to this id",
        status : false
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
