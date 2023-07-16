import {Post} from "@/features/posts/models/Post";

export interface PostsRepository {
    getPostsByAuthor: (authorId: number, paginate?: { page: number, perPage: number }) => Promise<Post[]>;
}