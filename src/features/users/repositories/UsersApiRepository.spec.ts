import {IUsersApiRepository, UsersApiRepository} from "@/features/users/repositories/UsersApiRepository";

describe('UsersApiRepository', () => {
    let repositoryInstance: IUsersApiRepository;

    beforeAll(() => {
        repositoryInstance = UsersApiRepository();
    })

    it('should return users from api', async () => {
        const users = await repositoryInstance.getUsersFromApi();

        expect(users?.length).toBeGreaterThan(0);
    });
});