import mongoose from "mongoose";
const measurementSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links to the user
  },
  garmentType: {
    type: String,
    enum: ['Shirt', 'Pants', 'Dress', 'Jacket', 'Other'],
    required: true,
  },
  measurements: {
    chest: { type: Number, required: false },
    waist: { type: Number, required: false },
    hips: { type: Number, required: false },
    length: { type: Number, required: false },
    sleeve: { type: Number, required: false },
    shoulder: { type: Number, required: false },
    additionalNotes: { type: String, required: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// module.exports = mongoose.model('Measurement', measurementSchema);

const Measurement = mongoose.model('Measurement', measurementSchema);
export default Measurement