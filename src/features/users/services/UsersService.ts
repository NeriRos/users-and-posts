import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {IUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";

export interface IUsersService {
    getAllUsers: () => Promise<any[]>;
}

export type UsersServiceDependencies = {
    apiRepository: IUsersApiRepository;
    dbRepository: IUsersDbRepository;
}

export const UsersService = (dependencies: UsersServiceDependencies) => {
    const getAllUsers = async () => {
        let users: any[] = [];

        try {
            users = await dependencies.dbRepository.getUsers();
        } catch (e) {
            console.error("Getting users from DB failed", e)
        }

        if (users.length > 0) {
            return users;
        }

        try {
            users = await dependencies.apiRepository.getUsers();
        } catch (e) {
            console.error("Getting users from API failed", e)
        }

        return users;
    }

    return {
        getAllUsers
    }
}