import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { TUser, TUserModel } from './user.interface';
import AppError from '../../app/errors/AppError';
import config from '../../app/config';

const userSchema: Schema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [
        true,
        'Name is required and must contain at least 4 characters.',
      ],
      minlength: [
        4,
        'Name is required and must contain at least 4 characters.',
      ],
      maxlength: [200, 'Name must not exceed 200 characters.'],
      match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required and must contain at least 3 characters.'],
      minlength: [3, 'Email is required and must contain at least 3 characters.'],
      maxlength: [100, 'Email must not exceed 100 characters.'],
      unique: true,
      validate: {
        validator: function (value: string) {
          const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          const hasNoConsecutiveDots = !/\.\./.test(value);
          const endsWithPeriod = !value.endsWith('.');
          const startsWithNumber = !/^[0-9]/.test(value);
          return isValidFormat && hasNoConsecutiveDots && endsWithPeriod && startsWithNumber;
        },
        message: 'Invalid email address format. Ensure it is correct and doesn’t have consecutive dots, doesn’t end with a period, and doesn’t start with a number.',
      },
    },
    password: {
      type: String,
      required: [
        true,
        'Password is required and must be at least 4 characters long.',
      ],
      minlength: [4, 'Password must be at least 4 characters long.'],
      maxlength: [30, 'Password can not exceed 30 characters.'],
      trim: true,
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: "Role must be either 'admin' or 'user'.",
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// return with id name and email
userSchema.set('toJSON', {
  transform: (doc, obj) => {
    return {
      _id: obj._id,
      name: obj.name,
      email: obj.email,
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
    throw new AppError(httpStatus.BAD_REQUEST, 'User Already Registered!');
  }
  this.password = await bcrypt.hash(
    this.password as string,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = mongoose.model<TUser, TUserModel>('User', userSchema);
