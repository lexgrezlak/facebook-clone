import { useLike } from "./useLike";
import { useUnlike } from "./useUnlike";

interface Props {
  postId: string;
}

export default function useLikeButtonManagement({ postId }: Props) {
  const { handleLike } = useLike({ postId });
  const { handleUnlike } = useUnlike({ postId });

  return { handleLike, handleUnlike };
}
