import prisma from "../../../../prisma/client";
import {User} from "@/features/users/models/User";
import {Prisma} from "@prisma/client";

export interface IUsersDbRepository {
    getUsers: () => Promise<User[]>
    saveUsers: (users: User[]) => Promise<any>
}

export const UsersDbRepository = () => {
    const getUsers = () => {
        return prisma.user.findMany();
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