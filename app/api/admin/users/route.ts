import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';
import { isUserRole } from '@/lib/roles';

export async function GET() {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await connectDB();
  const users = await User.find()
    .select('name email role disabled createdAt updatedAt lastSignedInAt')
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    users: users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      disabled: u.disabled,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
      lastSignedInAt: u.lastSignedInAt ?? null,
    })),
  });
}

export async function POST(req: Request) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { name, email, password, role } = body as Record<string, unknown>;

  if (typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 400 },
    );
  }
  if (!isUserRole(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  await connectDB();

  const normalizedEmail = email.toLowerCase().trim();
  const exists = await User.findOne({ email: normalizedEmail });
  if (exists) {
    return NextResponse.json(
      { error: 'Email already in use' },
      { status: 409 },
    );
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: typeof name === 'string' ? name.trim() || undefined : undefined,
    email: normalizedEmail,
    password: hashed,
    role,
    disabled: false,
  });

  return NextResponse.json({
    message: 'User created',
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      disabled: user.disabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastSignedInAt: user.lastSignedInAt ?? null,
    },
  });
}
