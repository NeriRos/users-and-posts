import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/features/users/pages/users-management/queries/GetUsers";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {User} from "@/features/users/models/User";
import {useRouter} from "next/router";
import {SORT_DIRECTION} from "@/features/users/pages/users-management/components/UsersTable/consts";
import {PaginationParameters} from "@/core/components/Table";
import {GetUsersResponse} from "@/features/users/apis/UsersCRUD";
import {PAGINATION_PER_PAGE} from "@/core/components/Table/consts";

export const useUsersTable = () => {
    const router = useRouter()
    const [page, setPage] = useState<number>()
    const [count, setCount] = useState<number>()

    const {error, data, isLoading} = useQuery<GetUsersResponse>({
        queryKey: ['users', count, page], queryFn: getUsers(count, page),
        initialData: {users: [], usersCount: 0},
    });
    const [sort, setSort] = useState<{ [key: string]: string }>({})

    const selectUser = (user: User) => {
        router.push(`/users/${user.id}/posts`)
    }

    const changeSortDirection = (direction: string, key: string) => {
        setSort((sort) => ({...sort, [key]: direction}));
    }

    const sortedUsers = useMemo(() => {
        const users = data.users || [];

        Object.keys(sort).forEach((key: string) => {
            users.sort((a: User, b: User) => {
                let keyOfUser = key as keyof User;

                if (sort[keyOfUser] === SORT_DIRECTION.ASC) {
                    return String(a[keyOfUser]).localeCompare(String(b[keyOfUser]))
                } else {
                    return String(b[keyOfUser]).localeCompare(String(a[keyOfUser]))
                }
            });
        });

        return users;
    }, [data, sort]);

    const paginate = useCallback((parameters: PaginationParameters) => {
        if (parameters.count)
            setCount(parameters.count)
        if (parameters.page || parameters.page === 0)
            setPage(parameters.page)
    }, [])

    const paginatedInitial = useRef(false);

    useEffect(() => {
        if (router.query.page && !paginatedInitial.current) {
            paginate({
                page: Number(router.query.page),
                count: router.query.perPage ? Number(router.query.perPage) : PAGINATION_PER_PAGE[0],
            })
            paginatedInitial.current = true;
        }
    }, [paginate, data.usersCount, router]);

    return {
        error,
        users: sortedUsers,
        usersCount: data.usersCount,
        isLoading,
        selectUser,
        changeSortDirection,
        paginate
    }
}