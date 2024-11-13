import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
    @Field()
    userId: string;

    @Field()
    username: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;
}
