import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterType {
    @Field()
    accessToken: string;
}
