import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/features/users/modules/UsersManagement/queries/GetAllUsers";
import {MouseEvent} from "react";
import {User} from "@/features/users/models/User";

export const useUsersTable = () => {
    const {error, data, isLoading} = useQuery({
        queryKey: ['users'], queryFn: getAllUsers,
        initialData: [],
    });

    const onUserSelected = (user: User, e: MouseEvent) => {
        console.log(user)
    }

    return {
        error,
        users: data,
        isLoading,
        onUserSelected
    }
}