import prisma from "../../../../prisma/client";
import {Address, User} from "@/features/users/models/User";
import {Prisma} from "@prisma/client";

export interface IUsersDbRepository {
    getUsers: () => Promise<User[]>
    saveUsers: (users: User[]) => Promise<any>
}

export const UsersDbRepository = (): IUsersDbRepository => {
    const getUsers = async (): Promise<User[]> => {
        const dbUsers = await prisma.user.findMany();

        return dbUsers.map(dbUser => ({
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
        saveUsers
    }
}