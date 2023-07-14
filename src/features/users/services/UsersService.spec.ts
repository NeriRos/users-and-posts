import {UsersService, IUsersService} from "@/features/users/services/UsersService";
import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {IUsersDbRepository, UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";

const UsersApiRepositoryMock: IUsersApiRepository = {
    getUsers: jest.fn().mockReturnValue([])
};

const UsersDbRepositoryMock: IUsersDbRepository = {
    getUsers: jest.fn().mockReturnValue([])
}

const users = [
    {
        id: 1,
        name: "Leanne Graham",
        email: "test@gmail.com",
        address: "Kulas Light, Apt. 556, Gwenborough, 92998-3874",
    }
];

describe('UsersService', () => {
    describe('Get users', () => {
        let usersServiceInstance: IUsersService;

        afterEach(() => {
            jest.clearAllMocks();
        });

       it('should get from API because Db is empty', async () => {
            UsersApiRepositoryMock.getUsers.mockReturnValue(users);

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.getAllUsers();

            expect(UsersApiRepositoryMock.getUsers).toHaveBeenCalled();
        });

        it('should get from DB', async () => {
            UsersDbRepositoryMock.getUsers.mockReturnValue(users)

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.getAllUsers();

            expect(UsersDbRepositoryMock.getUsers).toHaveBeenCalled();
            expect(UsersApiRepositoryMock.getUsers).not.toHaveBeenCalled();
        });
    });
});
