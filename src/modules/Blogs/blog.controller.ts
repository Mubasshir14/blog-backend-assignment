import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { BlogService } from './blog.service';
import sendResponse from '../../app/utils/sendResponse';

const createBlogIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const userEmail = req?.user?.email;
  const result = await BlogService.createBlogIntoDB(req.body, userEmail);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  });
});

const updateBlogFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const email = req?.user?.email;
  const result = await BlogService.updateBLogFromDB(req.body, id, email);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  });
});

const delteBlogFromDB: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const email = req?.user?.email;
  const result = await BlogService.deleteBlogFromDB(id, email);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: 200,
    data: result,
  });
});

const getAllBlogFromDB: RequestHandler = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogFromDB(req?.query);
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: 200,
    data: result,
  });
});

export const BlogController = {
  createBlogIntoDB,
  updateBlogFromDB,
  delteBlogFromDB,
  getAllBlogFromDB,
};
