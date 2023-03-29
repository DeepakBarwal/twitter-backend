import {UserRepository} from '../repositories/index.js';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async signIn(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if (!user) {
                throw {
                    success: false,
                    message: 'No user found'
                };
            }
            if (!user.comparePassword(data.password)) {
                throw {
                    success: false,
                    message: 'Incorrect password'
                };
            }
            const token = user.genJWT();
            return {
                success: true,
                message: 'Successfully created a new user',
                data: token,
                err: {}
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserService;