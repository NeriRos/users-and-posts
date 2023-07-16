import prisma from "../../../../prisma/client";
import {Address, User} from "@/features/users/models/User";
import {Prisma} from "@prisma/client";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

export interface UsersDbRepository extends UsersRepository {
    saveUsers: (users: User[]) => Promise<any>
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

    const getUsers = async (): Promise<User[]> => {
        const dbUsers = await prisma.user.findMany({
            orderBy: {
                name: 'asc'
            },
        });

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

    return {
        getUsers,
        saveUsers,
        getUserById
    }
}