import { Query, Resolver, Arg } from "type-graphql";
import { User } from "../entity/User";
import { UsersInput } from "./UsersInput";
import { Like } from "typeorm";
import { trimAndCapitalizeSentence } from "../utils/createConnection";

@Resolver()
export class UsersResolver {
  @Query(() => [User])
  async users(@Arg("input") { filter }: UsersInput): Promise<User[]> {
    const LIMIT = 5;
    // so that names are capitalized
    const processedFilter = trimAndCapitalizeSentence(filter);
    const [firstName, lastName] = processedFilter.split(" ");

    const users = await User.find({
      where: {
        firstName: Like(`%${firstName ?? ""}%`),
        lastName: Like(`%${lastName ?? ""}%`),
      },
      take: LIMIT,
    });

    return users;
  }
}
