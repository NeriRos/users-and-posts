import {NextApiResponse} from "next";
import {PostsService} from "@/features/posts/services/PostsService";
import {createPostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {createPostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {createApiRequestHandler} from "@/core/api/apiRequestHandler";
import {Post} from "@/features/posts/models/Post";

const postsService = PostsService({
    apiRepository: createPostsApiRepository(),
    dbRepository: createPostsDbRepository()
});

export const handlePostsCRUD = createApiRequestHandler({
        GET: async (req, res: NextApiResponse<Post[]>) => {
            const userId = Number(req.query.userId);
            const posts = await postsService.getUserPosts(userId);

            return res.status(200).json(posts);
        }
    }
);