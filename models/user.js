import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 21,
    },
    role: {
      type: [String],
      default: ['Normal'],
      enum: ['Normal', 'Viewer', 'Admin'],
    },
    confirmUser: {
      type: Boolean,
      default: false,
    },
    passwordResetCode: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);