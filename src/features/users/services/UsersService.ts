import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

export interface IUsersService {
    getAllUsers: () => Promise<User[]>;
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

    const getAllUsers = async (): Promise<User[]> => {
        try {
            const users = await dependencies.dbRepository.getUsers();

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

    return {
        getUser,
        getAllUsers
    }
}