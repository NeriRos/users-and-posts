import {Post} from "@/features/posts/models/Post";

export interface PostsRepository {
    getPostsByAuthor: (authorId: number) => Promise<Post[]>;
}