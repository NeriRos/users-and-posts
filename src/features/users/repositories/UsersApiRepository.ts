import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {ApiUser} from "@/features/users/models/ApiUser";
import {API_BASE_URL} from "@/features/users/repositories/consts";
import {User} from "@/features/users/models/User";

export interface IUsersApiRepository {
    getUsers: () => Promise<User[]>;
}

export const UsersApiRepository = () => {
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

        return apiUsers.map((apiUser: ApiUser) => convertApiUserToUser(apiUser));
    }

    return {
        getUsers
    }
}

