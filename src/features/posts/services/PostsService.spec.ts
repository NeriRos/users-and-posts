import {Post} from "@/features/posts/models/Post";
import {IPostsDbRepository} from "@/features/posts/repositories/PostsDbRepository";
import {IPostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {IPostsService, PostsService} from "@/features/posts/services/PostsService";

const PostsApiRepositoryMock: IPostsApiRepository = {
    getPostsByAuthor: jest.fn().mockReturnValue([])
};

const PostsDbRepositoryMock: IPostsDbRepository = {
    getPostsByAuthor: jest.fn().mockReturnValue([]),
    savePosts: jest.fn().mockReturnValue([])
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
});
