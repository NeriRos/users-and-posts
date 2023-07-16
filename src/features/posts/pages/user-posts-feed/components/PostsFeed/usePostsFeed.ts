import {useQuery} from "@tanstack/react-query";
import {getAllUsers} from "@/features/users/pages/users-management/queries/GetAllUsers";
import {MouseEvent} from "react";
import {User} from "@/features/users/models/User";
import {useRouter} from "next/router";
import {getUserPosts} from "@/features/posts/pages/user-posts-feed/queries/GetUserPosts";

export const usePostsFeed = ({user}: { user: User }) => {
    const {error, data, isLoading} = useQuery({
        queryKey: [`posts/${user.id}`], queryFn: () => getUserPosts(user.id),
        initialData: [],
    });

    return {
        error,
        posts: data,
        isLoading,
    }
}