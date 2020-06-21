import { useNavigate } from "react-router-dom";
import { Chat } from "./../types";
import { useMutation } from "@apollo/client";
import { CREATE_CHAT } from "../graphql/mutations";

interface Props {
  userId: string;
}

interface CreateChatData {
  createChat: Chat;
}

interface CreateChatVars {
  userId: string;
}

export function useCreateChat({ userId }: Props) {
  const navigate = useNavigate();
  const [createChat] = useMutation<CreateChatData, CreateChatVars>(
    CREATE_CHAT,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  async function handleCreateChat() {
    const res = await createChat({
      variables: { userId },
      update: (store, { data }) => {
        console.log(data);
      },
    });

    navigate(`/chats/${res.data?.createChat.id}`);
  }

  return { handleCreateChat };
}
