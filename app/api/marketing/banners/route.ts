import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Banner from '@/models/Banner';
import cloudinary from '@/lib/cloudinary';
import { bannerSchema } from '@/lib/validations/bannerSchema';

export async function GET() {
  try {
    await connectDB();
    const banners = await Banner.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: banners });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch banners.' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;
    const description = formData.get('description') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;

    const parsed = bannerSchema.safeParse({ description, startDate, endDate });
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    if (!imageFile) {
      return NextResponse.json(
        { success: false, errors: { image: ['Banner image is required.'] } },
        { status: 400 },
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'banners', resource_type: 'image' },
          (err, result) => {
            if (err || !result) return reject(err);
            resolve(result as { secure_url: string; public_id: string });
          },
        )
        .end(buffer);
    });

    const banner = await Banner.create({
      image: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
      description: parsed.data.description,
      startDate: parsed.data.startDate,
      endDate: parsed.data.endDate,
    });

    return NextResponse.json(
      { success: true, message: 'Banner created successfully.', data: banner },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to create banner.' },
      { status: 500 },
    );
  }
}
