export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export interface AuthResponse {
  data: {
    user: Omit<User, 'password'>;
    token: string;
  };
}

export interface ErrorResponse {
  error: string;
}