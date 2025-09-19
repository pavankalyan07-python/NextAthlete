import { Request, Response } from 'express';
import { User } from '../models/User.js';  // Use .js extension with ESM

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, dateOfBirth, gender, contactMethod, email, phone, password, state, city, consent } = req.body;

    // Check if user already exists by email or phone
    if (email) {
      const existingEmailUser = await User.findOne({ email });
      if (existingEmailUser) return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    if (phone) {
      const existingPhoneUser = await User.findOne({ phone });
      if (existingPhoneUser) return res.status(400).json({ success: false, message: 'Phone already registered' });
    }

    // Create new user instance
    const newUser = new User({
      fullName,
      dateOfBirth,
      gender,
      contactMethod,
      email,
      phone,
      password,
      state,
      city,
      consent
    });

    // Save user to DB; password hashed automatically in schema pre-save hook
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};
