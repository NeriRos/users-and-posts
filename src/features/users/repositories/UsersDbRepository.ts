import prisma from "../../../../prisma/client";
import {Address, User} from "@/features/users/models/User";
import {Prisma} from "@prisma/client";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

export interface UsersDbRepository extends UsersRepository {
    saveUsers: (users: User[]) => Promise<any>
    countUsers: () => Promise<number>
}

export const createUsersDbRepository = (): UsersDbRepository => {
    const getUserById = async (userId: number): Promise<User | undefined> => {
        const dbUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
        });

        if (dbUser) {
            return User.fromJson({
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                address: dbUser.address as Address,
            });
        }

        return undefined;
    }

    const getUsers = async (count?: number, page?: number): Promise<User[]> => {
        const dbUsers = await prisma.user.findMany(
            count && page ? {
                take: count,
                skip: count * (page - 1)
            } : undefined
        );

        return dbUsers.map(dbUser => User.fromJson({
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            address: dbUser.address as Address,
        }));
    }

    const saveUsers = (users: User[]) => {
        return prisma.user.createMany({
            data: users as Prisma.UserCreateInput[],
            skipDuplicates: true
        });
    }

    const countUsers = async (): Promise<number> => {
        return await prisma.user.count();
    }

    return {
        getUsers,
        saveUsers,
        getUserById,
        countUsers
    }
}