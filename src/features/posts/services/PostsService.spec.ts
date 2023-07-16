import {Post} from "@/features/posts/models/Post";
import {PostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {IPostsService, PostsService} from "@/features/posts/services/PostsService";
import {PostsRepository} from "@/features/posts/repositories/PostsRepository";

const PostsApiRepositoryMock: PostsRepository = {
    getPostsByAuthor: jest.fn().mockReturnValue([])
};

const PostsDbRepositoryMock: PostsDbRepository = {
    getPostsByAuthor: jest.fn().mockReturnValue([]),
    savePosts: jest.fn().mockReturnValue([]),
    deletePostById: jest.fn().mockReturnValue(undefined)
}

const authorId = 1;

const posts: Post[] = [
    Post.fromJson({
        id: 1,
        authorId,
        title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum"
    }),
];

describe('PostsService', () => {
    describe('Get posts', () => {
        let postsServiceInstance: IPostsService;

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should get from API because Db is empty', async () => {
            (PostsApiRepositoryMock.getPostsByAuthor as jest.Mock).mockReturnValue(posts);

            postsServiceInstance = PostsService({
                apiRepository: PostsApiRepositoryMock,
                dbRepository: PostsDbRepositoryMock
            });

            await postsServiceInstance.getUserPosts(authorId);

            expect(PostsApiRepositoryMock.getPostsByAuthor).toHaveBeenCalled();
        });

        it('should get from DB', async () => {
            (PostsDbRepositoryMock.getPostsByAuthor as jest.Mock).mockReturnValue(posts)

            postsServiceInstance = PostsService({
                apiRepository: PostsApiRepositoryMock,
                dbRepository: PostsDbRepositoryMock
            });

            await postsServiceInstance.getUserPosts(authorId);

            expect(PostsDbRepositoryMock.getPostsByAuthor).toHaveBeenCalled();
            expect(PostsApiRepositoryMock.getPostsByAuthor).not.toHaveBeenCalled();
        });
    });

    describe("Delete post", () => {
        it("should delete post", async () => {
            const postId = 1;
            const postsServiceInstance = PostsService({
                dbRepository: PostsDbRepositoryMock
            });

            await postsServiceInstance.deletePost(postId);

            expect(PostsDbRepositoryMock.deletePostById).toHaveBeenCalledWith(postId);
        });
    });
});
