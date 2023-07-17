import {IUsersService, UsersService} from "@/features/users/services/UsersService";
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
    getUserById: jest.fn().mockReturnValue(undefined),
    countUsers: jest.fn().mockReturnValue(0),
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

            await usersServiceInstance.getUsers();

            expect(UsersApiRepositoryMock.getUsers).toHaveBeenCalled();
        });

        it('should get from DB', async () => {
            (UsersDbRepositoryMock.getUsers as jest.Mock).mockReturnValue(users)

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.getUsers();

            expect(UsersDbRepositoryMock.getUsers).toHaveBeenCalled();
            expect(UsersApiRepositoryMock.getUsers).not.toHaveBeenCalled();
        });
    });

    describe('Count Users', () => {
        let usersServiceInstance: IUsersService;

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should count users from DB', async () => {
            (UsersDbRepositoryMock.countUsers as jest.Mock).mockReturnValue(1)

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            await usersServiceInstance.countUsers();

            expect(UsersDbRepositoryMock.countUsers).toHaveBeenCalled();
            expect(UsersApiRepositoryMock.getUsers).not.toHaveBeenCalled();
        });

        it('should count users from API', async () => {
            (UsersDbRepositoryMock.getUsers as jest.Mock).mockReturnValue([]);
            (UsersApiRepositoryMock.getUsers as jest.Mock).mockReturnValue(users);

            usersServiceInstance = UsersService({
                apiRepository: UsersApiRepositoryMock,
                dbRepository: UsersDbRepositoryMock
            });

            const usersCount = await usersServiceInstance.countUsers();

            expect(usersCount).toEqual(users.length);
        });
    });
});
