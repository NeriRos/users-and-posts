import {Prisma} from '@prisma/client'

export type User = Prisma.UserCreateInput;
export type UserWithoutPosts = Omit<User, 'posts'>;
