import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {ApiUser} from "@/features/users/models/ApiUser";
import {API_BASE_URL} from "@/features/users/repositories/consts";

export interface IUsersApiRepository {
    getUsers: () => Promise<ApiUser[]>;
}

export const UsersApiRepository = () => {
    const getUsers = (): Promise<ApiUser[]> => {
        return restGetRequest(API_BASE_URL);
    }

    return {
        getUsers
    }
}

