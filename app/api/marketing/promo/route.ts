import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { connectDB } from '@/lib/mongoose';
import { PromoServerSchema } from '@/lib/validations/promoSchema';
import PromoModel from '@/models/Promo';

export async function GET() {
  try {
    await connectDB();
    const promos = await PromoModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: promos });
  } catch (err) {
    console.error('[GET /api/marketing/promo]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch promos' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

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
    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, message: 'Banner image is required' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uploaded = await uploadToCloudinary(buffer);

    const promo = await PromoModel.create({
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      bannerImage: uploaded.secure_url,
      bannerImagePublicId: uploaded.public_id,
    });

    return NextResponse.json({ success: true, data: promo }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/marketing/promo]', err);
    return NextResponse.json(
      { success: false, message: 'Failed to create promo' },
      { status: 500 },
    );
  }
}

function uploadToCloudinary(
  buffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'promos', resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      },
    );
    stream.end(buffer);
  });
}
