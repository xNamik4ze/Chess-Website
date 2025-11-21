export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  nationality?: string;
  birthYear?: number;
  elo?: number;
  role?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  nationality?: string;
  birthYear?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}
