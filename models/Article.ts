import mongoose, { Document, Model, Schema } from 'mongoose';

export type ArticleStatus = 'enabled' | 'disabled';

export interface IArticle extends Document {
  title: string;
  content: string;
  publishDate: Date;
  status: ArticleStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema = new Schema<IArticle>(
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
  { timestamps: true, collection: 'tbl_articles' },
);

const ArticleModel: Model<IArticle> =
  mongoose.models.Article ?? mongoose.model<IArticle>('Article', ArticleSchema);

export default ArticleModel;
