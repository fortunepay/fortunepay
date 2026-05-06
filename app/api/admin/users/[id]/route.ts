import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';
import { requireSuperAdmin } from '@/lib/requireSuperAdmin';
import { isUserRole } from '@/lib/roles';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  const session = await requireSuperAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await context.params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const updates: {
    role?: string;
    disabled?: boolean;
    password?: string;
  } = {};

  if (payload.role !== undefined) {
    if (!isUserRole(payload.role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }
    if (id === session.user.id && payload.role !== 'superadmin') {
      return NextResponse.json(
        { error: 'You cannot remove your own super-admin role' },
        { status: 400 },
      );
    }
    updates.role = payload.role;
  }

  if (payload.disabled !== undefined) {
    if (typeof payload.disabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid disabled value' },
        { status: 400 },
      );
    }
    if (id === session.user.id && payload.disabled) {
      return NextResponse.json(
        { error: 'You cannot disable your own account' },
        { status: 400 },
      );
    }
    updates.disabled = payload.disabled;
  }

  if (payload.password !== undefined) {
    if (typeof payload.password !== 'string' || payload.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 },
      );
    }
    updates.password = await bcrypt.hash(payload.password, 12);
  }

  if (
    updates.role === undefined &&
    updates.disabled === undefined &&
    updates.password === undefined
  ) {
    return NextResponse.json(
      { error: 'Provide role, disabled, and/or password to update' },
      { status: 400 },
    );
  }

  await connectDB();

  const user = await User.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true },
  ).select('name email role disabled createdAt updatedAt lastSignedInAt');

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
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
