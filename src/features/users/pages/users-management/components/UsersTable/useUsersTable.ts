import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/features/users/pages/users-management/queries/GetAllUsers";
import {MouseEvent} from "react";
import {User} from "@/features/users/models/User";
import {useRouter} from "next/router";

export const useUsersTable = () => {
    const {error, data, isLoading} = useQuery({
        queryKey: ['users'], queryFn: getAllUsers,
        initialData: [],
    });
    const router = useRouter()

    const onUserSelected = (user: User, e: MouseEvent) => {
        router.push(`/users/${user.id}/posts`)
    }

    return {
        error,
        users: data,
        isLoading,
        onUserSelected
    }
}