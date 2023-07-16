import {PostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {Post} from "@/features/posts/models/Post";
import {PostsRepository} from "@/features/posts/repositories/PostsRepository";

export interface IPostsService {
    getUserPosts: (userId: number) => Promise<Post[]>;
    deletePost: (postId: number) => Promise<Post>;
}

export type PostsServiceDependencies = {
    apiRepository?: PostsRepository;
    dbRepository: PostsDbRepository;
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

        if (!dependencies.apiRepository) {
            return [];
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

    const deletePost = async (postId: number): Promise<Post> => {
        return dependencies.dbRepository.deletePostById(postId);
    }

    return {
        getUserPosts,
        deletePost
    }
}