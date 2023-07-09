import { e621 } from './config';
import { User } from './interfaces/users';

const UsersAPI = {
  // Fetch a user by name
  getUserByName: (username: string) => {
    return e621.get<User>(`/users/${username}.json`);
  },
  // Fetch a user by id
  getUserById: (userId: number) => {
    return e621.get<User>(`/users/${userId}.json`);
  },
}

export default UsersAPI
