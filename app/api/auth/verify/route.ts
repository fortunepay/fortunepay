import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { authenticated: false, disabled: false },
      { status: 401 },
    );
  }

  await connectDB();
  const user = await User.findById(session.user.id).select('disabled');
  if (!user) {
    return NextResponse.json(
      { authenticated: false, disabled: true },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    disabled: !!user.disabled,
  });
}
