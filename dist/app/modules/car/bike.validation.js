"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carValidationSchema = void 0;
const zod_1 = require("zod");
exports.carValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: 'the name of the bike should be in string format !!' })
        .min(3, { message: 'Name of the bike should be greater than 3 words !!' })
        .max(20, { message: 'Name of the bike should not be exceed 20 words !!' })
        .refine(value => /^[A-Z]/.test(value), {
        message: 'First Name must be an Capital Letter!!',
    }),
    brand: zod_1.z
        .string()
        .max(15, { message: 'brand name must not be exceed 15 words' })
        .refine(value => /^[A-Z]/.test(value), {
        message: 'The first letter of the brand name should be Capital leeter',
    }),
    price: zod_1.z.number({
        message: "the price should be a number not like with '$' or the currency sign",
    }),
    category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
    description: zod_1.z.string({
        message: 'description should be an text not the number',
    }),
    quantity: zod_1.z.number({ message: 'the quantity should be an number !!' }),
    inStock: zod_1.z.boolean({
        message: 'This field should be an true or false value !!',
    }),
    isDeleted: zod_1.z.boolean({ message: "the field should be an boolean data !!" }).default(false),
});
exports.default = exports.carValidationSchema;
