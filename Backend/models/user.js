import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // Example: checks for a 10-digit number
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
  ,
  role: {
    type: String,
    enum: ['Admin', 'Salesperson', 'Tailor', 'Customer'],
    required: true
  },
  password: { type: String, required: true }
});

// module.exports = mongoose.model('User', userSchema);
const User = mongoose.model("User",userSchema)

export default User;