import { UserService } from '../user.service';
import { UserController } from '../user.controller';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService();
        userController = new UserController(userService);
    });

    describe('test', () => {
        it('should return a string containing \'Test\'', async () => {
            const result: string = 'Test';
            jest.spyOn(userService, 'test').mockImplementation(() => result);

            expect(await userController.test()).toBe(result);
        });
    });
});
