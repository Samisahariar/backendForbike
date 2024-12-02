"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bike_routers_1 = require("./app/modules/car/bike.routers");
/* import { StudentRouters } from './modules/students/students.routers'; */
const app = (0, express_1.default)();
app.use(express_1.default.text());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', bike_routers_1.CarRouter);
app.use('/api/orders', bike_routers_1.OrderRouter);
/* const getthedata = (req: Request, res: Response) => {
  console.log(
    'the data is here and all of the data is here awe are all here and there !!',
  );
}; */
//application apis are all here and we are calling it through it
/* app.use('/api/v1/students', StudentRouters); */
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the  bike Store backend Project"
    });
});
exports.default = app;
