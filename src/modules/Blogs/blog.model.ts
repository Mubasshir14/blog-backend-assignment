import { model, Schema } from 'mongoose';
import { TBlogs } from './blog.interface';

const blogSchema = new Schema<TBlogs>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [5, 'Content must be at least 5 characters long'],
      maxlength: [300, 'Content cannot exceed 3000 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      minlength: [50, 'Content must be at least 50 characters long'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
      unique: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Blog = model<TBlogs>('Blog', blogSchema);
