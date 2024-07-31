import router from '@/router';
import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

interface User {
  email: string;
  token: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    errorMessage: '',
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const pb = new PocketBase('http://localhost:8090');
        const authData = await pb
          .collection('users')
          .authWithPassword(email, password);
        this.user = {
          email,
          token: authData.token,
        };
        pb.authStore.save(authData.token, authData.record);
        this.errorMessage = '';
      } catch (error) {
        if (error instanceof Error) {
          this.errorMessage = `Failed to login: ${error.message}`;
        } else {
          this.errorMessage = 'Failed to login: An unknown error occurred';
        }
      }
    },
    logout() {
      this.user = null;
      const pb = new PocketBase('http://localhost:8090');
      pb.authStore.clear();
      router.push('/login');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
