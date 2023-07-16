import {restGetRequest} from "@/core/repositories/delivery-methods/rest/GetRequest";
import {API_BASE_URL} from "@/features/posts/repositories/consts";
import {ApiPost} from "@/features/posts/models/ApiPost";
import {Post} from "@/features/posts/models/Post";
import {PostsRepository} from "@/features/posts/repositories/PostsRepository";

export const createPostsApiRepository = (): PostsRepository => {
    const convertApiPostToPost = (apiPost: ApiPost): Post => {
        return Post.fromJson({
            id: apiPost.id,
            title: apiPost.title,
            body: apiPost.body,
            authorId: apiPost.userId,
        });
    };

    const getPostsByAuthor = async (authorId: number): Promise<Post[]> => {
        const apiPosts: ApiPost[] = await restGetRequest(API_BASE_URL, {
            urlParameters: {
                userId: authorId
            }
        });

        return apiPosts.map((apiPost: ApiPost) => convertApiPostToPost(apiPost)).sort((a, b) => a.title.localeCompare(b.title));
    }

    return {
        getPostsByAuthor
    }
}

