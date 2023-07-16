import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {API_BASE_URL} from "@/features/users/repositories/consts";
import {ApiPost} from "@/features/posts/models/ApiPost";
import {Post} from "@/features/posts/models/Post";

export interface IPostsApiRepository {
    getPostsByAuthor: (authorId: number) => Promise<Post[]>;
}

export const PostsApiRepository = (): IPostsApiRepository => {
    const convertApiPostToPost = (apiPost: ApiPost): Post => {
        return Post.fromJson({
            id: apiPost.id,
            title: apiPost.title,
            body: apiPost.body,
            authorId: apiPost.authorId,
        });
    };

    const getPostsByAuthor = async (authorId: number): Promise<Post[]> => {
        const apiPosts: ApiPost[] = await restGetRequest(API_BASE_URL);

        return apiPosts.map((apiPost: ApiPost) => convertApiPostToPost(apiPost));
    }

    return {
        getPostsByAuthor
    }
}

