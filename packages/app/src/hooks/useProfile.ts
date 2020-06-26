import { useQuery } from "@apollo/client";
import { UserData, UserVars } from "../types";
import { GET_USER } from "../graphql/queries";

interface Props {
  id: string;
}

export function useProfile({ id }: Props) {
  const { data, loading } = useQuery<UserData, UserVars>(GET_USER, {
    variables: { id },
  });

  // so that it doesnt return the previous user on profile change
  const user = loading ? null : data?.user;

  return { user };
}
