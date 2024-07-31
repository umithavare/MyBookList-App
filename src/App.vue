<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/">MyBookList</router-link>
      </div>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/books">Books</router-link>
        <router-link to="/login" v-if="!isAuthenticated">Login</router-link>
        <button v-if="isAuthenticated" @click="logout" class="btn">
          Logout
        </button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const logout = () => {
      authStore.logout();
    };

    return {
      isAuthenticated,
      logout,
    };
  },
});
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #0072ff;
  color: white;
  font-family: 'Arial', sans-serif;
}

.navbar-brand {
  font-size: 1.8rem;
  font-weight: bold;
}

.navbar-brand a {
  color: #d5ecd5e8;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-brand a:hover {
  color: #ffeb3b;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  padding: 10px;
  transition: background 0.3s;
}

.navbar-links a:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #e74c3c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #c0392b;
}
</style>
