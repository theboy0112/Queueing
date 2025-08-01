import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field()
  departmentName: string;
}
