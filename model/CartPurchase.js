import mongoose from 'mongoose'

const CartPurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
  ],
  totalCost: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['Debit Card', 'Paystack', 'Flutterwave'],
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const CartPurchase = mongoose.model('CartPurchase', CartPurchaseSchema)

export default CartPurchase
