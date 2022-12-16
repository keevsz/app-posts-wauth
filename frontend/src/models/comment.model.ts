import { User } from "./user.model";

export interface Comment {
    id: string,
    description: string,
    likes: string[],
    createdAt: string,
    post: string,
    user: Partial<User>,
  }
  