import {UsersService, IUsersService} from "@/features/users/services/UsersService";
import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";

const UsersApiRepositoryMock: IUsersApiRepository = {
    getUsersFromApi: jest.fn()
};

describe('UsersService', () => {
    let usersServiceInstance: IUsersService;

    beforeAll(() => {
        usersServiceInstance = UsersService({
            apiRepository: UsersApiRepositoryMock
        });
    })

    it('should return all users from API because Db is empty', async () => {
        const users = await usersServiceInstance.getAllUsers();
        // expect(result).toEqual(users);
        // console.log("users", users);
        expect(UsersApiRepositoryMock.getUsersFromApi).toHaveBeenCalled();
    });
});