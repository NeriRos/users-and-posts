import {UsersService, IUsersService} from "@/features/users/services/UsersService";
import {IUsersApiRepository} from "@/features/users/repositories/UsersApiRepository";
import {IUsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {UserWithoutPosts} from "@/features/users/models/User";

const UsersApiRepositoryMock: IUsersApiRepository = {
    getUsers: jest.fn().mockReturnValue([])
};

const UsersDbRepositoryMock: IUsersDbRepository = {
    getUsers: jest.fn().mockReturnValue([]),
    saveUsers: jest.fn().mockReturnValue([])
}

const users: UserWithoutPosts[] = [
    {
        id: 1,
        name: "Leanne Graham",
        email: "test@gmail.com",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874"
        }
    }
];

describe('UsersService', () => {
    describe('Get users', () => {
        let usersServiceInstance: IUsersService;

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should get from API because Db is empty', async () => {
            (UsersApiRepositoryMock.getUsers as jest.Mock).mockReturnValue(users);

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.getAllUsers();

            expect(UsersApiRepositoryMock.getUsers).toHaveBeenCalled();
        });

        it('should get from DB', async () => {
            (UsersDbRepositoryMock.getUsers as jest.Mock).mockReturnValue(users)

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
