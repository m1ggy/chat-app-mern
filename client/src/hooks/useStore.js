import create from 'zustand';

const userSlice = (set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
});

export const useStore = create((set) => ({
  ...userSlice(set),
}));
