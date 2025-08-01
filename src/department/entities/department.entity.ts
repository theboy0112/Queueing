import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Department {
  @Field(() => Int)
  id: number;

  @Field()
  departmentName: string;

  @Field()
  createdAt: Date;
}
