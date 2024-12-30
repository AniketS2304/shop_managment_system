const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['Fabric', 'Sewing Material'],
    required: true
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Inventory', inventorySchema);



/*

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name of the fabric or material
  category: { 
    type: String, 
    enum: ['Fabric', 'Sewing Material', 'Accessory'],  // Categories for better classification
    required: true 
  },
  description: { type: String },  // Optional description of the material
  unit: { 
    type: String, 
    enum: ['Meter', 'Yard', 'Roll', 'Piece'],  // Units for fabric/materials
    required: true 
  },
  quantity: { type: Number, required: true },  // Current available stock
  initialQuantity: { type: Number, required: true },  // Stock added initially
  price: { type: Number, required: true },  // Price per unit
  wholesalePrice: { type: Number },  // Optional wholesale price
  retailPrice: { type: Number },  // Optional retail price
  expirationDate: { type: Date },  // Expiry date for perishable fabrics
  lastUpdated: { type: Date, default: Date.now }  // Timestamp for tracking updates
});

// Track inventory movements (like sales, returns, usage in sewing)
const movementSchema = new mongoose.Schema({
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },  // Reference to the inventory item
  movementType: { 
    type: String, 
    enum: ['Add', 'Reduce'],  // Whether stock is being added or reduced
    required: true 
  },
  quantity: { type: Number, required: true },  // Amount added/reduced
  reason: { type: String },  // Reason for the stock change (e.g., purchase, use in order)
  date: { type: Date, default: Date.now }  // When the movement occurred
});

module.exports = {
  Inventory: mongoose.model('Inventory', inventorySchema),
  Movement: mongoose.model('Movement', movementSchema)  // This tracks the history of stock changes
};

 */