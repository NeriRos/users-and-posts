import {createPostsApiRepository} from "@/features/posts/repositories/PostsApiRepository";
import {PostsRepository} from "@/features/posts/repositories/PostsRepository";

describe('PostsApiRepository', () => {
    let repositoryInstance: PostsRepository;

    const authorId = 1;

    beforeAll(() => {
        repositoryInstance = createPostsApiRepository();
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