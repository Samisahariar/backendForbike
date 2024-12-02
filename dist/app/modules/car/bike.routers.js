"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = exports.CarRouter = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const router = express_1.default.Router();
const router2 = express_1.default.Router();
router.post('/', bike_controller_1.BikeController.createBikeData);
router.get('/', bike_controller_1.BikeController.getAllTheCarController);
router.get('/:id', bike_controller_1.BikeController.getTheSingleBIke);
router.put('/:id', bike_controller_1.BikeController.updateSingleBike);
router.delete('/:id', bike_controller_1.BikeController.deleteSingleDataController);
router2.post('/', bike_controller_1.OrderController.createOrderController);
router2.get('/revenue', bike_controller_1.OrderController.returnRevenuseController);
exports.CarRouter = router;
exports.OrderRouter = router2;
