import mongoose from 'mongoose'

const paymentSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Bank Transfer', 'Debit Card', 'Wallet', 'Crypto Wallet'],
    required: true,
  },
  paymentInfo: {
    type: Object,
    required: true,
  },
  refund: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
const paymentMod = mongoose.model('Payment', paymentSchema)
export default paymentMod
