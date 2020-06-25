import { testConnection } from "./../utils/testConnection";
import { SIGN_UP } from "./../../../app/src/graphql/mutations";
import { createTestClient } from "apollo-server-testing";
import { createServer } from "../createServer";
import { User } from "../entity/User";
import faker from "faker";

faker.seed(Date.now() + 234234);

let mutate: any;

beforeAll(async () => {
  await testConnection.create();
  const server = await createServer();
  const client = createTestClient(server);
  mutate = client.mutate;
});

afterAll(async () => {
  await testConnection.close();
});

beforeEach(async () => {
  await testConnection.clear();
});

it("should sign up the user", async function () {
  const dateValue = "1995-12-12";
  const user = {
    firstName: "John",
    lastName: "Smith",
    birthday: new Date(dateValue),
    email: "john123@gmail.com",
    password: "DemoT19382",
  };
  const response = await mutate({
    mutation: SIGN_UP,
    variables: { ...user },
  });

  const { password, birthday, ...rest } = user;

  const savedUsers = await User.find({ where: { email: user.email } });
  expect(savedUsers).toHaveLength(1);

  const savedUser = savedUsers[0];
  const { passwordHash, id, birthday: savedBirthday, ...savedRest } = savedUser;

  expect(savedRest).toEqual(rest);
  expect(passwordHash).not.toEqual(password);
  expect(new Date(savedBirthday)).toEqual(birthday);

  expect(response?.data).toEqual({ signUp: true });
  expect(response?.errors).toEqual(undefined);
});
