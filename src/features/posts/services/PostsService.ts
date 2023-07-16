import {IPostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {IPostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {Post} from "@/features/posts/models/Post";

export interface IPostsService {
    getUserPosts: (userId: number) => Promise<Post[]>;
}

export type PostsServiceDependencies = {
    apiRepository: IPostsApiRepository;
    dbRepository: IPostsDbRepository;
}

export const PostsService = (dependencies: PostsServiceDependencies): IPostsService => {

    const getUserPosts = async (userId: number): Promise<Post[]> => {
        try {
            const posts = await dependencies.dbRepository.getPostsByAuthor(userId);

            if (posts.length > 0) {
                return posts;
            }
        } catch (e) {
            console.error("Getting posts from DB failed", e)
        }

        try {
            const posts = await dependencies.apiRepository.getPostsByAuthor(userId);
            await dependencies.dbRepository.savePosts(posts);

            return posts;
        } catch (e) {
            console.error("Getting posts from API failed", e)
        }

        return [];
    }

    return {
        getUserPosts
    }
}