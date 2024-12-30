const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links to a customer
  },
  garmentType: {
    type: String,
    enum: ['Shirt', 'Pants', 'Dress', 'Jacket', 'Other'],
    required: true,
  },
  fabricDetails: {
    type: String, // Details about fabric if the customer provided it
    required: false,
  },
  measurements: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Measurement', // Links to customer measurements if available
    required: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed', 'Delivered'],
    default: 'Pending',
  },
  estimatedCompletionDate: {
    type: Date,
    required: true, // When the order is expected to be completed
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // The employee who created the order
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
