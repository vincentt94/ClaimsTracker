import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  dateOfService: { type: String, required: true },
  claimType: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied'],
    default: 'pending',
  },
  claimNumber: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true,
});

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;
