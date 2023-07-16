import prisma from "../../../../prisma/client";
import {Prisma} from "@prisma/client";
import {Post} from "@/features/posts/models/Post";
import {PostsRepository} from "@/features/posts/repositories/PostsRepository";

export interface PostsDbRepository extends PostsRepository {
    savePosts: (posts: Post[]) => Promise<any>
    deletePostById: (postId: number) => Promise<any>
}

export const createPostsDbRepository = (): PostsDbRepository => {
    const convertDbPostToPost = (apiPost: any): Post => {
        return Post.fromJson({
            id: apiPost.id,
            title: apiPost.title,
            body: apiPost.body,
            authorId: apiPost.authorId,
        });
    };

    const getPostsByAuthor = async (authorId: number, paginate?: {
        page: number,
        perPage: number
    }): Promise<Post[]> => {
        const perPage = paginate?.perPage || 10;

        const dbPosts = await prisma.post.findMany({
            where: {
                authorId
            },
            orderBy: {
                title: 'desc',
            },
            ...(paginate && {
                skip: perPage * (paginate.page - 1),
                take: perPage
            })
        });

        return dbPosts.map(dbPost => convertDbPostToPost(dbPost));
    }

    const savePosts = (posts: Post[]) => {
        return prisma.post.createMany({
            data: posts as Prisma.PostCreateInput[],
            skipDuplicates: true
        });
    }

    const deletePostById = (postId: number) => {
        return prisma.post.delete({
            where: {
                id: postId
            },
        });
    }

    return {
        getPostsByAuthor,
        savePosts,
        deletePostById
    }
}