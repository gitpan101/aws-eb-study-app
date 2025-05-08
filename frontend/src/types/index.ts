export interface IUser {
  id: string;
  username: string;
  email: string;
}

export interface ITodo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  is_completed: string;
  created_at: string;
}
