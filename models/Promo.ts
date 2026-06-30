import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPromo extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  bannerImage: string;
  bannerImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const PromoSchema = new Schema<IPromo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title must be 120 characters or less'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [1000, 'Description must be 1000 characters or less'],
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
    },
    bannerImage: {
      type: String,
      required: [true, 'Banner image is required'],
    },
    bannerImagePublicId: {
      type: String,
      required: [true, 'Banner image public ID is required'],
    },
  },
  {
    timestamps: true,
    collection: 'tbl_promo',
  },
);

const PromoModel: Model<IPromo> =
  mongoose.models.Promo ?? mongoose.model<IPromo>('Promo', PromoSchema);

export default PromoModel;