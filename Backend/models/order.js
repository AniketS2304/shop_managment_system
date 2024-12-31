import mongoose from 'mongoose';

// Order Schema
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (Customer)
    required: true
  },
  orderItems: [
    {
      fabricId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory', // Reference to Inventory model for fabrics
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  measurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
    length: { type: Number }
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed', 'delivered'],
    default: 'pending'
  },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
