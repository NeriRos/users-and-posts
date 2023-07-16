import {useQuery} from "@tanstack/react-query";
import {getUserPosts} from "@/features/posts/pages/user-posts-feed/queries/GetUserPosts";
import {useRouter} from "next/router";

export const usePostsFeed = () => {
    const router = useRouter();
    const {userId} = router.query;
    const {error, data, isLoading} = useQuery({
        queryKey: [`posts`, userId], queryFn: () => getUserPosts(userId as string),
        initialData: [],
    });

    return {
        error,
        posts: data,
        isLoading,
    }
}