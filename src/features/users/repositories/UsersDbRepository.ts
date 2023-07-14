import prisma from "../../../../prisma/client";

export interface IUsersDbRepository {
    getUsers: () => Promise<any[]>
}

export const UsersDbRepository = () => {
    const getUsers = () => {
        return prisma.user.findMany();
    }

    return {
        getUsers
    }
}