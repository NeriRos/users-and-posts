import {NextApiResponse} from "next";
import {PostsService} from "@/features/posts/services/PostsService";
import {PostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {PostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {createApiRequestHandler, MethodToHandlerMapType} from "@/core/api/apiRequestHandler";
import {Post} from "@/features/posts/models/Post";

const postsService = PostsService({
    apiRepository: PostsApiRepository(),
    dbRepository: PostsDbRepository()
});

export const handlePostsCRUD = createApiRequestHandler({
        GET: async (req, res: NextApiResponse<Post[]>) => {
            const userId = Number(req.query.userId);
            const posts = await postsService.getUserPosts(userId);

            return res.status(200).json(posts);
        }
    }
);