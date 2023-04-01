import UserService from "../../src/services/user-service";
import { UserRepository } from "../../src/repositories";

jest.mock('../../src/repositories/user-repository.js');

describe('user service signup test', () => {
    test('should successfully create a user', async () => {
        const data = {
            email: 'a@b.com',
            password: '12345'
        };
        (UserRepository.prototype.create).mockReturnValue({...data, createdAt: '2022-01-04', updatedAt: '2022-01-04'});
        const service = new UserService();
        const response = await service.signUp();

        expect(response.email).toBe(data.email);
    });
});