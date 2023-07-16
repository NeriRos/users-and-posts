import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {ApiUser} from "@/features/users/models/ApiUser";
import {API_BASE_URL} from "@/features/users/repositories/consts";
import {UserWithoutPosts} from "@/features/users/models/User";

export interface IUsersApiRepository {
    getUsers: () => Promise<UserWithoutPosts[]>;
}

export const UsersApiRepository = () => {
    const convertApiUserToUser = (apiUser: ApiUser): UserWithoutPosts => {
        const address = {
            street: apiUser.address.street,
            suite: apiUser.address.suite,
            city: apiUser.address.city,
            zipcode: apiUser.address.zipcode,
        };

        return {
            id: apiUser.id,
            email: apiUser.email,
            name: apiUser.name,
            address,
        }
    };

    const getUsers = async (): Promise<UserWithoutPosts[]> => {
        const apiUsers: ApiUser[] = await restGetRequest(API_BASE_URL);

        return apiUsers.map((apiUser: ApiUser) => convertApiUserToUser(apiUser));
    }

    return {
        getUsers
    }
}

