import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  contactMethod: 'email' | 'phone';
  email?: string;
  phone?: string;
  password: string;
  state?: string;
  city?: string;
  consent: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
    contactMethod: { type: String, required: true, enum: ['email', 'phone'] },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required() { return this.contactMethod === 'email'; },
      unique: true,
      sparse: true,
      validate: {
        validator: (v: string) => /\S+@\S+\.\S+/.test(v),
        message: 'Invalid email format'
      }
    },
    phone: {
      type: String,
      trim: true,
      required() { return this.contactMethod === 'phone'; },
      unique: true,
      sparse: true,
      validate: {
        validator: (v: string) => /^\d{10}$/.test(v),
        message: 'Phone number must be 10 digits'
      }
    },
    password: { type: String, required: true, minlength: 8 },
    state: String,
    city: String,
    consent: { type: Boolean, required: true },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Pre-save hook to hash password if changed
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', UserSchema);
