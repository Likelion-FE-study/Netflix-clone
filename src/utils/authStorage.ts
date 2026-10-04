export interface User {
  email: string;
  password: string;
}

const USER_KEY = "netflix-user";
const LOGIN_KEY = "netflix-login";

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as User;
};

export const loginUser = () => {
  localStorage.setItem(LOGIN_KEY, "true");
};

export const logoutUser = () => {
  localStorage.removeItem(LOGIN_KEY);
};

export const isLoggedIn = () => {
  return localStorage.getItem(LOGIN_KEY) === "true";
};