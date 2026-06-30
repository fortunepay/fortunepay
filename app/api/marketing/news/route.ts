import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import NewsModel from '@/models/News';
import { newsSchema } from '@/lib/validations/newsSchema';

export async function GET() {
  try {
    await connectDB();
    const news = await NewsModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: news });
  } catch (err) {
    console.error('[GET /api/marketing/news]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = newsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const news = await NewsModel.create(parsed.data);
    return NextResponse.json(
      {
        success: true,
        message: 'News created successfully.',
        data: news,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('[POST /api/marketing/news]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to create news item.' },
      { status: 500 },
    );
  }
}
