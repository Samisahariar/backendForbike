"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cars = exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
    },
    description: {
        type: String,
        max: 30,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    toJSON: {
        virtuals: true,
    },
});
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date },
});
bikeSchema.pre('save', function (next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    this.updated_at = new Date();
    next();
});
orderSchema.pre('save', function (next) {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    this.updated_at = new Date();
    next();
});
bikeSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
bikeSchema.pre('findOne', function (next) {
    this.findOne({ isDeleted: { $ne: true } });
    next();
});
bikeSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
bikeSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Convert ObjectId to string
        delete ret.id; // Remove id field
        return ret;
    },
});
/* bikeSchema.post('aggregate', function (doc, next) {
  console.log(doc)
  next()
}) */
bikeSchema.set('toJSON', { virtuals: true });
bikeSchema.set('toObject', { virtuals: true });
/* bikeSchema.virtual('update_at').get(function () {
  return new Date()
}) */
exports.Orders = (0, mongoose_1.model)('order', orderSchema);
exports.Cars = (0, mongoose_1.model)('car', bikeSchema);
