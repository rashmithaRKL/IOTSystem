import { NextRequest } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return Response.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      email,
      password,
      name,
      role: 'user',
    });

    // Don't send password in response
    const userWithoutPassword = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return Response.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Error creating user' },
      { status: 500 }
    );
  }
}
