/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const emailValidationRegex =
  /^[a-zA-Z0-9]+([\._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [
        {
          validator: function (value) {
            return emailValidationRegex.test(value);
          },
          message: 'Please enter a valid email address',
        },
        {
          validator: function (value) {
            return value.length >= 3;
          },
          message: 'Email must be at least 3 characters long',
        },
        {
          validator: function (value) {
            return value.length <= 30;
          },
          message: 'Email must not exceed 30 characters',
        },
        {
          validator: function (value) {
            return !value.startsWith('.');
          },
          message: 'Email cannot start with a dot',
        },
        {
          validator: function (value) {
            return !value.endsWith('.');
          },
          message: 'Email cannot end with a dot',
        },
        {
          validator: function (value) {
            return !value.includes('..');
          },
          message: 'Email cannot contain consecutive dots',
        },
        {
          validator: function (value) {
            const domain = value.split('@')[1];
            return domain && domain.includes('.');
          },
          message: 'Email must have a valid domain with a dot',
        },
        {
          validator: function (value) {
            const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];
            const domain = value.split('@')[1];
            return allowedDomains.includes(domain);
          },
          message:
            'Email must belong to a valid domain (gmail.com, yahoo.com, outlook.com)',
        },
      ],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
