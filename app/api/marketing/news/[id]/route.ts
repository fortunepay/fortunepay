import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import NewsModel from '@/models/News';
import { newsSchema } from '@/lib/validations/newsSchema';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;
    const existing = await NewsModel.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: 'News not found.' },
        { status: 404 },
      );

    const body = await req.json();
    const parsed = newsSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );

    const updated = await NewsModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });
    return NextResponse.json({
      success: true,
      message: 'News updated successfully.',
      data: updated,
    });
  } catch (err) {
    console.error('[PATCH /api/marketing/news/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update news.' },
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
    const existing = await NewsModel.findById(id);
    if (!existing)
      return NextResponse.json(
        { success: false, message: 'News not found.' },
        { status: 404 },
      );

    await NewsModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: 'News deleted successfully.',
    });
  } catch (err) {
    console.error('[DELETE /api/marketing/news/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete news.' },
      { status: 500 },
    );
  }
}
