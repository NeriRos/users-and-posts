import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";
import {PaginationParameters} from "@/core/components/Table";

export interface IUsersService {
    countUsers: () => Promise<number>;
    getUsers: (pagination?: PaginationParameters) => Promise<User[]>;
    getUser: (userId: number) => Promise<User | undefined>;
}

export type UsersServiceDependencies = {
    apiRepository: UsersRepository;
    dbRepository: UsersDbRepository;
}

export const UsersService = (dependencies: UsersServiceDependencies): IUsersService => {

    const getUser = async (userId: number): Promise<User | undefined> => {
        try {
            const user = await dependencies.dbRepository.getUserById(userId);

            if (user) {
                return user;
            }
        } catch (e) {
            console.error("Getting user from DB failed", e)
        }

        try {
            const user = await dependencies.apiRepository.getUserById(userId);

            if (user) {
                await dependencies.dbRepository.saveUsers([user]);
            }

            return user;
        } catch (e) {
            console.error("Getting user from API failed", e)
        }

        return undefined;
    }

    // Getting users from db first and then from api (not only posts)
    const getUsers = async (pagination?: PaginationParameters): Promise<User[]> => {
        try {
            const users = await dependencies.dbRepository.getUsers(pagination);

            if (users.length > 0) {
                return users;
            }
        } catch (e) {
            console.error("Getting users from DB failed", e)
        }

        try {
            const users = await dependencies.apiRepository.getUsers();
            await dependencies.dbRepository.saveUsers(users);

            return users;
        } catch (e) {
            console.error("Getting users from API failed", e)
        }

        return [];
    }

    const countUsers = async (): Promise<number> => {
        try {
            const usersCount = await dependencies.dbRepository.countUsers();

            if (usersCount) {
                return usersCount;
            }
        } catch (e) {
            console.error("Counting users from DB failed", e)
        }

        try {
            const users = await dependencies.apiRepository.getUsers();

            return users.length;
        } catch (e) {
            console.error("Counting users from API failed", e)
        }

        return 0;
    }

    return {
        getUser,
        getUsers,
        countUsers
    }
}