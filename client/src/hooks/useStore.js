import create from 'zustand';
import { persist } from 'zustand/middleware';
export const userInitialState = {
  fName: '',
  lName: '',
  conversations: '',
  email: '',
  authenticated: false,
};

const userSlice = (set, get) => ({
  user: userInitialState,
  setUser: (user) => set(() => ({ user })),
  clearUser: () => set(userInitialState),
});

export const useStore = create(
  persist(
    (set, get) => ({
      ...userSlice(set, get),
    }),
    {
      name: 'currentUser',
      getStorage: () => localStorage,
    }
  )
);
