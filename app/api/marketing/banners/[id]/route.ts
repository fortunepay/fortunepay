import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Banner from '@/models/Banner';
import cloudinary from '@/lib/cloudinary';
import { bannerSchema } from '@/lib/validations/bannerSchema';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'Banner not found.' },
        { status: 404 },
      );
    }

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

    let imageUrl = banner.image;
    let imagePublicId = banner.imagePublicId;

    if (imageFile && imageFile.size > 0) {
      await cloudinary.uploader.destroy(banner.imagePublicId);

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

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const updated = await Banner.findByIdAndUpdate(
      id,
      {
        image: imageUrl,
        imagePublicId,
        description: parsed.data.description,
        startDate: parsed.data.startDate,
        endDate: parsed.data.endDate,
      },
      { new: true },
    );

    return NextResponse.json({
      success: true,
      message: 'Banner updated successfully.',
      data: updated,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to update banner.' },
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

    const banner = await Banner.findById(id);
    if (!banner) {
      return NextResponse.json(
        { success: false, message: 'Banner not found.' },
        { status: 404 },
      );
    }

    await cloudinary.uploader.destroy(banner.imagePublicId);

    await Banner.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to delete banner.' },
      { status: 500 },
    );
  }
}
