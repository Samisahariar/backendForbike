"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = exports.BikeController = void 0;
const bike_validation_1 = __importDefault(require("./bike.validation"));
const bike_sevices_1 = require("./bike.sevices");
const order_validation_1 = __importDefault(require("./order.validation"));
const zod_1 = require("zod");
const createBikeData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bike;
    try {
        bike = req.body;
        // Validate and parse the input data
        const parsedBikeValidationData = bike_validation_1.default.parse(bike);
        // Save the parsed data to the database
        const result = yield bike_sevices_1.BikeServices.createCarInDB(parsedBikeValidationData);
        res.status(200).json({
            message: 'Bike Created Successfully !',
            status: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            const restOftheError = {};
            err.errors.forEach(eachError => {
                /* const value: number | string = Object(eachError).recevied */
                const errorType = eachError.code === 'too_small' ? 'min' : eachError.code;
                const field = String(eachError.path[0]);
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
                };
            });
            const formatedError = {
                message: 'validation Failed !',
                success: false,
                error: {
                    name: 'validation failed',
                    errors: restOftheError,
                },
                stack: err.stack,
            };
            res.status(400).json(formatedError);
        }
    }
});
//get all the cars api call is here and all the code
const getAllTheCarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = {};
        Object.keys(req.query).forEach(key => {
            const value = req.query[key];
            if (typeof value === 'string') {
                query[key] = value;
            }
        });
        const result = yield bike_sevices_1.BikeServices.getAllTheBikes(query);
        res.status(200).json({
            message: 'Bikes retrieved  succesfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            status: false,
            message: error.message ||
                'something went wrong when data is rethriving from the database !!',
            error: err,
        });
    }
});
//get the single bike
const getTheSingleBIke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield bike_sevices_1.BikeServices.getSingleBike(id);
        res.status(200).json({
            message: 'Bikes retrieved  succesfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        if (error.name == 'ZodError') {
            res.status(400).json({
                message: 'Validation Failed',
                status: false,
                error: error,
            });
        }
    }
});
///update a single bike
const updateSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const toUpdate = req.body;
        const result = yield bike_sevices_1.BikeServices.updataSingleBike(id, toUpdate);
        res.status(200).json({
            message: 'updated Succesfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            status: false,
            message: error.message ||
                'something went wrong when data is rethriving from the database !!',
            error: err,
        });
    }
});
//delete single car data from the database and all of the sequence !!
const deleteSingleDataController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield bike_sevices_1.BikeServices.deleteSingleBike(id);
        res.status(200).json({
            message: 'Bike destatusfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            message: error.message || 'something wrong !',
            status: false,
            error: error,
        });
    }
});
//order create in the database alongwith the product details
const createOrderController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let order;
    try {
        order = req.body;
        const validateOrderData = order_validation_1.default.parse(order);
        const result = yield bike_sevices_1.OrderServices.orderCreate(validateOrderData);
        res.status(200).json({
            message: 'order created succesfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            const restOftheError = {};
            err.errors.forEach(eachError => {
                /* const value: number | string = Object(eachError).recevied */
                const errorType = eachError.code === 'too_small' ? 'min' : eachError.code;
                const field = String(eachError.path[0]);
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
                };
            });
            const formatedError = {
                message: 'validation Failed !',
                success: false,
                error: {
                    name: 'validation failed',
                    errors: restOftheError,
                },
                stack: err.stack,
            };
            res.status(400).json(formatedError);
        }
        else {
            res.status(500).json({
                message: "internaml ServerError",
                status: false,
            });
        }
    }
});
//returns only the revenues here is the api !!
const returnRevenuseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_sevices_1.OrderServices.returnRevenuseServices();
        if (result.status) {
            res.status(400).json({
                messsage: 'There is no specific data relatedd to this id',
                status: false,
            });
        }
        res.status(200).json({
            message: 'Revenue calculated successfully !!',
            status: true,
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(400).json({
            message: error.message || 'something wrong !',
            status: false,
            error: err,
        });
    }
});
exports.BikeController = {
    createBikeData,
    getAllTheCarController,
    getTheSingleBIke,
    updateSingleBike,
    deleteSingleDataController,
};
exports.OrderController = {
    createOrderController,
    returnRevenuseController,
};
