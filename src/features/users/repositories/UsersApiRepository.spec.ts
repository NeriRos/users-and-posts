import {getUsersFromApi} from "@/features/users/repositories/UsersApiRepository";

describe('UsersApiRepository', () => {
    it('should return users from api', async () => {
        const users = await getUsersFromApi();
        expect(users?.length).toBeGreaterThan(0);
    });
});