import mongoose, { Document, Model, Schema } from 'mongoose';

export type VideoStatus = 'enabled' | 'disabled';

export interface IFpVideo extends Document {
  title: string;
  youtubeUrl: string;
  status: VideoStatus;
  createdAt: Date;
  updatedAt: Date;
}

const FpVideoSchema = new Schema<IFpVideo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [150, 'Title must be 150 characters or less'],
    },
    youtubeUrl: {
      type: String,
      required: [true, 'YouTube URL is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
  },
  {
    timestamps: true,
    collection: 'tbl_fp_videos',
  },
);

const FpVideoModel: Model<IFpVideo> =
  mongoose.models.FpVideo ?? mongoose.model<IFpVideo>('FpVideo', FpVideoSchema);

export default FpVideoModel;
