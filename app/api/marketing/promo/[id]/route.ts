import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { connectDB } from '@/lib/mongoose';
import PromoModel from '@/models/Promo';
import { PromoServerSchema } from '@/lib/validations/promoSchema';

export async function PATCH(
  req: NextRequest,
  // { params }: { params: { id: string } },
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    // const { id } = await params;
    const { id } = await context.params;
    const existing = await PromoModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Promo not found' },
        { status: 404 },
      );
    }

    const form = await req.formData();
    const raw = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      startDate: form.get('startDate') as string,
      endDate: form.get('endDate') as string,
    };

    const parsed = PromoServerSchema.safeParse(raw);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? 'Invalid input';
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const { title, description, startDate, endDate } = parsed.data;

    const imageFile = form.get('bannerImage') as File | null;
    let { bannerImage, bannerImagePublicId } = existing;

    if (imageFile && imageFile.size > 0) {
      if (existing.bannerImagePublicId) {
        await cloudinary.uploader.destroy(existing.bannerImagePublicId);
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploaded = await uploadToCloudinary(buffer);
      bannerImage = uploaded.secure_url;
      bannerImagePublicId = uploaded.public_id;
    }

    const updated = await PromoModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        bannerImage,
        bannerImagePublicId,
      },
      { returnDocument: 'after' },
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error('[PATCH /api/marketing/promo/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to update promo' },
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
    const existing = await PromoModel.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: 'Promo not found' },
        { status: 404 },
      );
    }

    if (existing.bannerImagePublicId) {
      await cloudinary.uploader.destroy(existing.bannerImagePublicId);
    }

    await PromoModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Promo deleted' });
  } catch (err) {
    console.error('[DELETE /api/marketing/promo/:id]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to delete promo' },
      { status: 500 },
    );
  }
}

function uploadToCloudinary(
  buffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'events', resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      },
    );
    stream.end(buffer);
  });
}
