import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {ApiUser} from "@/features/users/models/ApiUser";
import {API_BASE_URL} from "@/features/users/repositories/consts";
import {User} from "@/features/users/models/User";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

export const createUsersApiRepository = (): UsersRepository => {
    const convertApiUserToUser = (apiUser: ApiUser): User => {
        return User.fromJson({
            id: apiUser.id,
            email: apiUser.email,
            name: apiUser.name,
            address: {
                street: apiUser.address.street,
                suite: apiUser.address.suite,
                city: apiUser.address.city,
                zipcode: apiUser.address.zipcode,
            },
        });
    };

    const getUsers = async (): Promise<User[]> => {
        const apiUsers: ApiUser[] = await restGetRequest(API_BASE_URL);

        return apiUsers.map((apiUser: ApiUser) => convertApiUserToUser(apiUser)).sort((a, b) => a.name.localeCompare(b.name));
    }

    const getUserById = async (userId: number): Promise<User | undefined> => {
        const apiUser: ApiUser = await restGetRequest(`${API_BASE_URL}/${userId}`);

        return convertApiUserToUser(apiUser);
    }

    return {
        getUsers,
        getUserById
    }
}

