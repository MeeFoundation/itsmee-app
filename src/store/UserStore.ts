import { atom, createStore } from "jotai/vanilla";
import type { User } from "@utils/types";
const store = createStore();
export const userAtom = atom<User>();


export const setUserData = (user: User) => {
  store.set(userAtom, user);
};
export const getUserData = () => {
  return store.get(userAtom);
};

export const subscribeUserData = (callback: (user?: User) => void) => {
  store.sub(userAtom, () => {
    const user = getUserData();
    callback(user);
  });
};