import { Request, Response } from 'express';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { fullName, dateOfBirth, gender, contactMethod, email, phone, password, state, city, consent } = req.body;

    // Check if user already exists
    if (email && await User.findOne({ email }))
      return res.status(400).json({ success: false, message: 'Email already registered' });
    if (phone && await User.findOne({ phone }))
      return res.status(400).json({ success: false, message: 'Phone already registered' });

    // Create user
    const newUser = new User({
      fullName, dateOfBirth, gender, contactMethod, email, phone, password, state, city, consent
    });
    await newUser.save();

    // Generate verification token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "1h" }
    );

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // use another service if preferred
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      }
    });

    // Send verification email
    const verificationUrl = `http://localhost:5000/api/auth/verify?token=${token}`;
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: newUser.email,
      subject: "Verify your email",
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your account.</p>`,
    });

    res.status(201).json({ success: true, message: 'Registration successful! Please verify your email.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};
