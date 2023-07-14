import {getUsersFromApi} from "@/features/users/repositories/UsersApiRepository";

export const getAllUsers = async () => {
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
        users = await getUsersFromApi();
    } catch (e) {
        console.error("Getting users from API failed", e)
    }

    return users;
}