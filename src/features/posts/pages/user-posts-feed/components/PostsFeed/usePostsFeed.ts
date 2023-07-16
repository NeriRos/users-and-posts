import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getUserPosts} from "@/features/posts/pages/user-posts-feed/queries/GetUserPosts";
import {useRouter} from "next/router";
import axios from "axios";

export const usePostsFeed = () => {
    const router = useRouter();
    const {userId} = router.query;
    const queryClient = useQueryClient()
    const {error, data, isLoading} = useQuery({
        queryKey: [`posts`, userId], queryFn: () => getUserPosts(userId as string),
        initialData: [],
    });

    const deletePostQuery = async (postId: number) => {
        await axios.delete(`/user/${userId}/posts/${postId}`)

        await queryClient.invalidateQueries({queryKey: [`posts`, userId]})
    }

    const {mutate: deletePost} = useMutation({mutationFn: deletePostQuery})


    return {
        error,
        posts: data,
        isLoading,
        deletePost
    }
}