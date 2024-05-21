import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userParams: CreateUserParams) {
  try {
    await connectToDatabase();
    const newUser = await User.create({
      clerkId: userParams.clerkId,
      name: userParams.name,
      email: userParams.email,
      picture: userParams.picture,
      username: userParams.username,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateUser(userParams: UpdateUserParams) {
  try {
    await connectToDatabase();
    const { clerkId, path, updateData } = userParams;
    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function deleteUser(userParams: DeleteUserParams) {
  try {
    await connectToDatabase();
    const { clerkId } = userParams;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error('User not found!');
    }

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   '_id'
    // );

    await Question.deleteMany({ author: user._id });

    // TODO: delete user answers and comments

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
