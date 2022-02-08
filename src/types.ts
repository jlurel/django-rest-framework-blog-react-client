import { Dispatch, SetStateAction } from "react";

export interface Post {
  id: number;
  author: AuthorType;
  title: string;
  excerpt: string;
  content: string;
  status: "published";
  category: CategoryType;
  slug: string;
}

export type AuthorType = {
  about: string;
  email: string;
  firstname: string;
  username: string;
};

export type CategoryType = {
  name: string;
};

export type RegisterFormDataType = {
  email: string;
  username: string;
  password: string;
};

export type LoginFormDataType = {
  email: string;
  password: string;
};

export type AuthUserType = {
  email: string;
  username: string;
  firstname: string;
  about: string;
};

export type UserContextType = {
  user: AuthUserType | null;
  setUser: Dispatch<SetStateAction<AuthUserType | null>>;
};

export type UserContextProviderPropsType = {
  children: JSX.Element;
};
