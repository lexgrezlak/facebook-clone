export interface UserPreview {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Post {
  id: number;
  content: string;
  createdAt: Date;
}

export interface PostAndAuthor extends Post {
  author: UserPreview;
}

export interface UserPreviewAndPosts extends UserPreview {
  posts: Post[];
}
