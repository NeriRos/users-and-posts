import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {IUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";

export interface IUsersService {
    getAllUsers: () => Promise<User[]>;
}

export type UsersServiceDependencies = {
    apiRepository: IUsersApiRepository;
    dbRepository: IUsersDbRepository;
}

export const UsersService = (dependencies: UsersServiceDependencies) => {

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
        getAllUsers
    }
}