import {createUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

describe('UsersApiRepository', () => {
    let repositoryInstance: UsersRepository;

    beforeAll(() => {
        repositoryInstance = createUsersApiRepository();
    })

    it('should return users from api', async () => {
        const users = await repositoryInstance.getUsers();

        expect(users?.length).toBeGreaterThan(0);
    });

    it("should return user by id from api", async () => {
        const user = await repositoryInstance.getUserById(1);

        expect(user).toBeDefined();
    });
});