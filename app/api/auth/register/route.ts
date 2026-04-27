import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();
    console.log('🟢 DB connected (register)');

    const body = await req.json();
    const { name, email, password, role } = body;

    console.log('📥 Incoming register:', email);

    if (!name || !email || !password || !role) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      console.log('⚠️ User already exists');
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    console.log('✅ User created:', user.email);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
