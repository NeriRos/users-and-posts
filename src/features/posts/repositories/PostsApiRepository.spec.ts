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

    it('should return different posts from api for two different users', async () => {
        const posts1 = await repositoryInstance.getPostsByAuthor(1);
        const posts2 = await repositoryInstance.getPostsByAuthor(2);

        expect(posts1).not.toEqual(posts2);
    });
});