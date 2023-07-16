import {NextApiResponse} from "next";
import {PostsService} from "@/features/posts/services/PostsService";
import {createPostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {createPostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {createApiRequestHandler, MethodToHandlerMapType} from "@/core/api/apiRequestHandler";
import {Post} from "@/features/posts/models/Post";

const postsService = PostsService({
    dbRepository: createPostsDbRepository()
});

export const handlePostCRUD = createApiRequestHandler({
        DELETE: async (req, res: NextApiResponse<Post>) => {
            const postId = Number(req.query.postId);

            const post = await postsService.deletePost(postId);

            return res.status(200).json(post);
        }
    }
);