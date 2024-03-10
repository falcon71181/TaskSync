interface IUser {
  username: string;
  email: string;
  password: string;
}

interface ITask {
  userEmail: string;
  title: string;
  description?: string;
  isCompleted: boolean | false;
  tags: string[];
}

export { IUser, ITask };
