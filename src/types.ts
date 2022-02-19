import { Dispatch, SetStateAction } from 'react';

export type SetValue<T> = Dispatch<SetStateAction<T>>;
export type StatusType = 'published' | 'draft';

export interface AuthorInterface {
  id: number;
  about: string;
  email: string;
  firstname: string;
  username: string;
}

export interface CategoryInterface {
  id: number;
  name: string;
}

export interface PostInterface {
  id: number;
  author: AuthorInterface;
  title: string;
  excerpt: string;
  content: string;
  status: StatusType;
  category: CategoryInterface;
  slug: string;
  image: string;
}

export interface PostFormDataInterface {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: number;
  status: StatusType;
  image: File | string | null;
}

export interface RegisterFormDataInterface {
  email: string;
  username: string;
  password: string;
}

export interface LoginFormDataInterface {
  email: string;
  password: string;
}

export interface AuthUserInterface {
  email: string;
  username: string;
  firstname: string;
  about: string;
  id: number;
}

export interface UserContextInterface {
  user: AuthUserInterface | null;
  setUser: SetValue<null> | Dispatch<SetStateAction<AuthUserInterface | null>>;
  login: () => void;
  logout: () => void;
}

export interface ThemeContextInterface {
  isDark: boolean;
  toggleBlackTheme: Dispatch<SetStateAction<boolean>>;
}

export interface SearchContextInterface {
  searchTerms: string;
  setSearchTerms: Dispatch<SetStateAction<string>>;
}

export interface ChildrenProps {
  children: JSX.Element;
}

export interface PostsComponentProps {
  isLoading: boolean;
  posts: PostInterface[] | never[];
}
