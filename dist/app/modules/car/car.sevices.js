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
exports.OrderServices = exports.CarServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bike_models_1 = require("./bike.models");
const returnRevenuseServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_models_1.Orders.aggregate([
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
    ]);
    return result[0];
});
const orderCreate = (reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const objectid = new mongoose_1.default.Types.ObjectId(reqBody.product);
    const theOrderDetails = yield bike_models_1.Cars.aggregate([{ $match: { _id: objectid } }]);
    reqBody.data = theOrderDetails[0];
    const result = yield bike_models_1.Orders.create(reqBody);
    bike_models_1.Cars.findOneAndUpdate({ _id: objectid }, [
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
    ], { new: true });
    return result;
});
const createCarInDB = (carData) => __awaiter(void 0, void 0, void 0, function* () {
    /*  const carDatsa = new Cars(carData)
    if (await carDatsa.isCarExists(carData.name)) {
      throw Error('car is alread exists!')
    }  */
    const result = yield bike_models_1.Cars.create(carData);
    const sanitizedResult = yield bike_models_1.Cars.findById(result._id).select('-id');
    return sanitizedResult;
});
const getAllTheCars = (querys) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign({}, querys);
    const query = {};
    Object.keys(filters).forEach((key) => {
        query[key] = { $regex: filters[key], $options: 'i' };
    });
    const result = yield bike_models_1.Cars.find(query);
    return result;
});
const getSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield bike_models_1.Cars.aggregate([{ $match: { _id: objectId } }]);
    return result;
});
//update a bike in this section and we are all here for this sectionn !!
const updataSingleBike = (id, toUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield bike_models_1.Cars.updateOne({ _id: objectId }, Object.assign(Object.assign({}, toUpdate), { updated_at: new Date() }));
    if (result.modifiedCount === 1) {
        const result2 = yield bike_models_1.Cars.aggregate([{ $match: { _id: objectId } }]);
        return result2;
    }
});
const deleteSingleBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield bike_models_1.Cars.updateOne({ _id: objectId }, { isDeleted: true });
    return result;
});
exports.CarServices = {
    createCarInDB,
    getAllTheCars,
    getSingleBike,
    updataSingleBike,
    deleteSingleBike,
};
exports.OrderServices = {
    orderCreate,
    returnRevenuseServices,
};
