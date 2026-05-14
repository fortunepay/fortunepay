import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import FpVideoModel from '@/models/Fpvideo';
import { fpVideoSchema } from '@/lib/validations/fpVideoSchema';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const existing = await FpVideoModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Video not found.' },
        { status: 404 },
      );
    }

    const body = await req.json();
    const parsed = fpVideoSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const updated = await FpVideoModel.findByIdAndUpdate(id, parsed.data, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Video updated successfully.',
      data: updated,
    });
  } catch (err) {
    console.error('[PATCH /api/marketing/fpvideos/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update video.' },
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

    const existing = await FpVideoModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Video not found.' },
        { status: 404 },
      );
    }

    await FpVideoModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Video deleted successfully.',
    });
  } catch (err) {
    console.error('[DELETE /api/marketing/fpvideos/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete video.' },
      { status: 500 },
    );
  }
}
