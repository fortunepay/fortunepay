import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import FpVideoModel from '@/models/Fpvideo';
import { fpVideoSchema } from '@/lib/validations/fpVideoSchema';

export async function GET() {
  try {
    await connectDB();
    const videos = await FpVideoModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: videos });
  } catch (err) {
    console.error('[GET /api/marketing/fpvideos]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch videos.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const parsed = fpVideoSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const video = await FpVideoModel.create(parsed.data);

    return NextResponse.json(
      { success: true, message: 'Video added successfully.', data: video },
      { status: 201 },
    );
  } catch (err) {
    console.error('[POST /api/marketing/fpvideos]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to create video.' },
      { status: 500 },
    );
  }
}