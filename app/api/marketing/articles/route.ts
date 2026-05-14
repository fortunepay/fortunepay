import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import ArticleModel from '@/models/Article';
import { articleSchema } from '@/lib/validations/articleSchema';

export async function GET() {
  try {
    await connectDB();
    const articles = await ArticleModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: articles });
  } catch (err) {
    console.error('[GET /api/marketing/articles]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch articles.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const parsed = articleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const article = await ArticleModel.create(parsed.data);
    return NextResponse.json(
      {
        success: true,
        message: 'Article created successfully.',
        data: article,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('[POST /api/marketing/articles]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to create article.' },
      { status: 500 },
    );
  }
}
