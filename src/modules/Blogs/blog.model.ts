import { model, Schema } from 'mongoose';
import { TBlog, TBlogModel } from './blog.interface';

const blogSchema = new Schema<TBlog>(
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
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

blogSchema.set('toJSON', {
  transform: (doc, obj) => {
    return {
      _id: obj._id,
      title: obj.title,
      content: obj.content,
      author: obj.author,
    };
  },
});

blogSchema.statics.isBlogExists = async function (id: string) {
  const blog = await Blog.findById(id);
  return blog;
};

export const Blog = model<TBlog, TBlogModel>('Blog', blogSchema);
