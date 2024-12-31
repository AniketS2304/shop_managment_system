import express from 'express';
import Order from '../models/order.js';
import User from "../models/user.js"
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// Update Order Status and Notify Customer
router.patch('/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status

    //TODO validation 
    if (['pending', 'in progress', 'completed', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Fetch the order from the database
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status
    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    // Send notification to the customer
    const customerEmail = User.email; // Assuming `order` has a `customerEmail` field
    const customerName = User.name; // Assuming `order` has a `customerName` field
    const emailSubject = `Order #${order._id} Status Update`;
    const emailText = `Dear ${customerName}, your order is now marked as "${status}".`;

    await sendEmail(customerEmail, emailSubject, emailText);

    res.status(200).json({
      message: 'Order status updated and customer notified',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
