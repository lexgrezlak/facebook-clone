import { useState } from "react";

export const useToggleComments = () => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);
  const toggleComments = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return { toggleComments, isCommentsVisible };
};
