import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import ArticleModel from '@/models/Article';
import { articleSchema } from '@/lib/validations/articleSchema';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const existing = await ArticleModel.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: 'Article not found.' },
        { status: 404 },
      );

    const body = await req.json();
    const parsed = articleSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );

    const updated = await ArticleModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });
    return NextResponse.json({
      success: true,
      message: 'Article updated successfully.',
      data: updated,
    });
  } catch (err) {
    console.error('[PATCH /api/marketing/articles/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update article.' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;
    const existing = await ArticleModel.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: 'Article not found.' },
        { status: 404 },
      );

    await ArticleModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (err) {
    console.error('[DELETE /api/marketing/articles/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete article.' },
      { status: 500 },
    );
  }
}
