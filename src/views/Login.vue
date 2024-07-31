<template>
  <div class="login-page">
    <div class="form-container">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="btn">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <router-link to="/register" class="btn register-link"
        >Register</router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const errorMessage = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        await authStore.login(email.value, password.value);
        errorMessage.value = '';
        router.push('/');
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to login: ${error.message}`;
        } else {
          errorMessage.value = 'Failed to login: An unknown error occurred';
        }
      }
    };

    return {
      email,
      password,
      login,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  font-family: 'Arial', sans-serif;
}

.form-container {
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
}

input {
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 15px 20px;
  border: none;
  border-radius: 4px;
  background: #0072ff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #005bb5;
}

.register-link {
  display: inline-block;
  margin-top: 15px;
  background: #e74c3c;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background 0.3s;
}

.register-link:hover {
  background: #c0392b;
}

.error {
  margin-top: 20px;
  color: #e74c3c;
  font-size: 1rem;
}
</style>
