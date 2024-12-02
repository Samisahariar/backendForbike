"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordervalidationSchema = void 0;
const zod_1 = require("zod");
exports.ordervalidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    product: zod_1.z.string(),
    quantity: zod_1.z.number(),
    totalPrice: zod_1.z.number(),
});
exports.default = exports.ordervalidationSchema;
