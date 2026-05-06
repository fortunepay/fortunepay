import mongoose, { Document, Model, Schema } from 'mongoose';

export type EventCategory = 'News' | 'Promo' | 'Event';

export interface IEvent extends Document {
  title: string;
  description: string;
  category: EventCategory;
  startDate: Date;
  endDate: Date;
  bannerImage: string;
  bannerImagePublicId: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
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
    category: {
      type: String,
      enum: ['News', 'Promo', 'Event'],
      required: [true, 'Category is required'],
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
    collection: 'tbl_events',
  },
);

const EventModel: Model<IEvent> =
  mongoose.models.Event ?? mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;
