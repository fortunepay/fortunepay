import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: { type: String, select: false },

    role: {
      type: String,
      enum: ['superadmin', 'hr', 'marketing', 'cs'],
      required: true,
    },

    disabled: { type: Boolean, default: false },

    lastSignedInAt: { type: Date },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
    collection: 'tbl_users',
  },
);

export default mongoose.models.User || mongoose.model('User', userSchema);