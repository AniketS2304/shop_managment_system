import express from 'express';
import Order from '../models/order.js';
import User from '../models/user.js';
import { sendEmail } from '../utils/email.js';

const router = express.Router();

// ✅ Update Order Status and Notify Customer
router.patch('/:orderId/status', async (req, res) => {
  try {    
    console.log(req.body)
    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ 1. Validate status
    const validStatuses = ['pending', 'in progress', 'completed', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // ✅ 2. Fetch the order from the database
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // ✅ 3. Update the order status
    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    // ✅ 4. Fetch customer details
    const customerId = order.customerId;
    const customer = await User.findById(customerId); // Use `findById` instead of `find`

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const customerEmail = customer.email; // Get email from customer
    const customerName = customer.name; // Get name from customer

    if (!customerEmail) {
      return res.status(400).json({ message: 'Customer email not found' });
    }

    // ✅ 5. Send notification email to the customer
    const emailSubject = `Order #${order._id} Status Update`;
    const emailText = `Dear ${customerName}, your order is now marked as "${status}".`;

    await sendEmail(customerEmail, emailSubject, emailText);

    // ✅ 6. Send Response
    res.status(200).json({
      message: 'Order status updated and customer notified successfully',
      order,
    });
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
