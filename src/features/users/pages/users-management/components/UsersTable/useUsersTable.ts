import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/features/users/pages/users-management/queries/GetAllUsers";
import {MouseEvent, useMemo, useState} from "react";
import {User} from "@/features/users/models/User";
import {useRouter} from "next/router";
import {SORT_DIRECTION} from "@/features/users/pages/users-management/components/UsersTable/consts";

export const useUsersTable = () => {
    const {error, data, isLoading} = useQuery({
        queryKey: ['users'], queryFn: getAllUsers,
        initialData: [],
    });
    const router = useRouter()
    const [sort, setSort] = useState<{ [key: string]: string }>({})

    const selectUser = (user: User) => {
        router.push(`/users/${user.id}/posts`)
    }

    const changeSortDirection = (direction: string, key: string) => {
        setSort((sort) => ({...sort, [key]: direction}));
    }

    const sortedUsers = useMemo(() => {
        Object.keys(sort).forEach((key: string) => {
            data.sort((a: User, b: User) => {
                let keyOfUser = key as keyof User;

                if (sort[keyOfUser] === SORT_DIRECTION.ASC) {
                    return String(a[keyOfUser]).localeCompare(String(b[keyOfUser]))
                } else {
                    return String(b[keyOfUser]).localeCompare(String(a[keyOfUser]))
                }
            });
        });

        return data;
    }, [data, sort]);

    return {
        error,
        users: sortedUsers,
        isLoading,
        selectUser,
        changeSortDirection
    }
}