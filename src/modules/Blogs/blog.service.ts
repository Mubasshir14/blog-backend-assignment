import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../User/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

const createBlogIntoDB = async (payload: TBlog, email: string) => {
  const userEmail = await User.findUserId(email);
  const user = await User.isUserExists(email);

  if (!userEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not Found');
  }
  if (user && user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }
  if (user?.email !== email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  payload.author = userEmail;
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const updateBLogFromDB = async (payload: TBlog, id: string, email: string) => {
  const blog = await Blog.isBlogExists(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }
  const authorId = blog.author?.toString();

  const user = await User.findUserById(authorId);

  if (user && user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  if (user?.email !== email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');
  return result;
};

const deleteBlogFromDB = async (id: string, email: string) => {
  const blog = await Blog.isBlogExists(id);
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const authorId = blog.author?.toString();

  const user = await User.findUserById(authorId);

  if (user && user.isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  }

  if (user?.email !== email) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized access!');
  }

  await Blog.findByIdAndDelete(id);
};

const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search()
    .filter()
    .sort();
  const result = await blogQuery.modelQuery.populate('author');
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  updateBLogFromDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
