export interface Post {
  id: number;
  author: number;
  title: string;
  excerpt: string;
  content: string;
  status: "published";
  category: number;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}
