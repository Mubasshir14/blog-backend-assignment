/* eslint-disable no-unused-vars */
import { Types } from 'mongoose';
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
};

export interface TUserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  findUserId(email: string): Promise<Types.ObjectId | undefined | null>;
  findUserById(id: string | undefined): Promise<TUser | undefined | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = 'user' | 'admin';
