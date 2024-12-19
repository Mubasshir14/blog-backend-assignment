import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { TUser, TUserModel } from './user.interface';
import AppError from '../../app/errors/AppError';
import config from '../../app/config';

const userSchema: Schema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// return with id name and email
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    return {
      _id: ret._id,
      name: ret.name,
      email: ret.email,
    };
  },
});

// user exist or not with email 
userSchema.statics.isUserExists = async function (email: string) {
  const user = await User.findOne({ email }).select('+password');
  return user;
};

userSchema.statics.findUserId = async function (email: string) {
  const user = await User.findOne({ email });
  return user?._id || undefined;
};

userSchema.statics.findUserById = async function (id: string) {
  const user = await User.findById(id);
  return user || undefined;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.pre('save', async function (next) {
  const user = await User.findOne({ email: this.email });
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email Already Registered!');
  }
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = mongoose.model<TUser, TUserModel>('User', userSchema);
