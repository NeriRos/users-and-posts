import {UsersService, IUsersService} from "@/features/users/services/UsersService";
import {UsersDbRepository} from "@/features/users/repositories/UsersDbRepository";
import {User} from "@/features/users/models/User";
import {UsersRepository} from "@/features/users/repositories/UsersRepository";

const UsersApiRepositoryMock: UsersRepository = {
    getUsers: jest.fn().mockReturnValue([]),
    getUserById: jest.fn().mockReturnValue(undefined)
};

const UsersDbRepositoryMock: UsersDbRepository = {
    getUsers: jest.fn().mockReturnValue([]),
    saveUsers: jest.fn().mockReturnValue([]),
    getUserById: jest.fn().mockReturnValue(undefined)
}

const users: User[] = [
    User.fromJson({
        id: 1,
        name: "Leanne Graham",
        email: "test@gmail.com",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874"
        }
    }),
];

describe('UsersService', () => {
    describe('Get User', () => {
        it('should get user by id', async () => {
            (UsersApiRepositoryMock.getUserById as jest.Mock).mockReturnValue(users[0]);

            const usersServiceInstance: IUsersService = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.getUser(users[0].id);

            expect(UsersApiRepositoryMock.getUserById).toHaveBeenCalledWith(users[0].id);
        });
    });

    describe('Get All Users', () => {
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
