import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
    @Field()
    username: string;

    @Field()
    password: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;
}
