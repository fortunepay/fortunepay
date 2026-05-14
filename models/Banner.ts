import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBanner extends Document {
  image: string;
  imagePublicId: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    image: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'tbl_banners',
  },
);

const Banner: Model<IBanner> =
  mongoose.models.Banner ?? mongoose.model<IBanner>('Banner', BannerSchema);

export default Banner;
