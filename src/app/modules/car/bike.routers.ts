import express from 'express'
import { BikeController, OrderController } from './bike.controller'


const router = express.Router()
const router2 = express.Router()


router.post('/', BikeController.createBikeData)

router.get('/', BikeController.getAllTheCarController)

router.get('/:id', BikeController.getTheSingleBIke)

router.put('/:id', BikeController.updateSingleBike)

router.delete('/:id', BikeController.deleteSingleDataController)

router2.post('/', OrderController.createOrderController)

router2.get('/revenue', OrderController.returnRevenuseController)

export const CarRouter = router
export const OrderRouter = router2
