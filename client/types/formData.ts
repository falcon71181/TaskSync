type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginFormData = Omit<RegisterFormData, "confirmPassword" | "username">;

type AddTaskFormData = {
  title: string;
  description?: string;
  tags?: string[];
};

export type { RegisterFormData, LoginFormData, AddTaskFormData };
