import { Types } from 'mongoose';

export type TBlogs = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
