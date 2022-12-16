import { User } from './user.model'

export interface Post {
  id: string
  description: string
  image: string
  user: Partial<User>
  likes: [string]
  createdAt: string
}
