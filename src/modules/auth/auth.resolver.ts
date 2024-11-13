import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserType } from './types/user.type';
import { RegisterType } from './types/register.type';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => UserType, { description: 'Register a new user' })
    async register(
        @Args('username') username: string,
        @Args('password') password: string,
        @Args('firstName') firstName: string,
        @Args('lastName') lastName: string,
        @Args('email') email: string,
    ): Promise<UserType> {
        const user = await this.authService.register(username, password, firstName, lastName, email);

        return user;
    }

    @Mutation(() => RegisterType, { description: 'Login a user and receive an access token' })
    async login(
        @Args('username') username: string,
        @Args('password') password: string,
    ): Promise<RegisterType> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        return this.authService.login(user);
    }
}
