import prisma from "../../../../prisma/client";
import {Prisma} from "@prisma/client";
import {Post} from "@/features/posts/models/Post";

export interface IPostsDbRepository {
    getPostsByAuthor: (authorId: number) => Promise<Post[]>
    savePosts: (posts: Post[]) => Promise<any>
}

export const PostsDbRepository = (): IPostsDbRepository => {
    const convertDbPostToPost = (apiPost: any): Post => {
        return Post.fromJson({
            id: apiPost.id,
            title: apiPost.title,
            body: apiPost.body,
            authorId: apiPost.authorId,
        });
    };

    const getPostsByAuthor = async (authorId: number): Promise<Post[]> => {
        const dbPosts = await prisma.post.findMany({
            where: {
                authorId
            }
        });

        return dbPosts.map(dbPost => convertDbPostToPost(dbPost));
    }

    const savePosts = (posts: Post[]) => {
        return prisma.post.createMany({
            data: posts as Prisma.PostCreateInput[],
            skipDuplicates: true
        });
    }

    return {
        getPostsByAuthor,
        savePosts
    }
}