import {IPostsApiRepository, PostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";

describe('PostsApiRepository', () => {
    let repositoryInstance: IPostsApiRepository;

    const authorId = 1;

    beforeAll(() => {
        repositoryInstance = PostsApiRepository();
    })

    it('should return posts from api', async () => {
        const posts = await repositoryInstance.getPostsByAuthor(authorId);

        expect(posts?.length).toBeGreaterThan(0);
    });
});