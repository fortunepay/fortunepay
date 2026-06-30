import mongoose, { Document, Model, Schema } from 'mongoose';

export type NewsStatus = 'enabled' | 'disabled';

export interface INews extends Document {
  title: string;
  content: string;
  publishDate: Date;
  status: NewsStatus;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title must be 200 characters or less'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    publishDate: {
      type: Date,
      required: [true, 'Publish date is required'],
    },
    status: {
      type: String,
      enum: ['enabled', 'disabled'],
      default: 'enabled',
    },
  },
  { timestamps: true, collection: 'tbl_news' },
);

const NewsModel: Model<INews> =
  mongoose.models.News ?? mongoose.model<INews>('News', NewsSchema);

export default NewsModel;
