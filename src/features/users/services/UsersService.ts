import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";

export interface IUsersService {
    getAllUsers: () => Promise<any[]>;
}

export type UsersServiceDependencies = {
    apiRepository: IUsersApiRepository;
}

export const UsersService = (dependencies: UsersServiceDependencies) => {
    const getAllUsers = async () => {
        let users: any[] = [];

        try {
            // TODO: implement get from db
        } catch (e) {
            console.error("Getting users from DB failed", e)
        }

        if (users.length > 0) {
            return users;
        }

        try {
            users = await dependencies.apiRepository.getUsersFromApi();
        } catch (e) {
            console.error("Getting users from API failed", e)
        }

        return users;
    }

    return {
        getAllUsers
    }
}