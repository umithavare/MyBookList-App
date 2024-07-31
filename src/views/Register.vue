<template>
  <div class="register-page">
    <div class="form-container">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" required />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="btn">Register</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '@/services/api';

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const register = async () => {
      try {
        errorMessage.value = '';
        await api.registerUser({
          email: email.value,
          password: password.value,
        });
        alert('User registered successfully');
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to register: ${error.message}`;
        } else {
          errorMessage.value = 'Failed to register: An unknown error occurred';
        }
      }
    };

    return {
      email,
      password,
      register,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.register-page {
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

input[type='email'],
input[type='password'] {
  width: 100%;
  box-sizing: border-box;
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

.error {
  margin-top: 20px;
  color: #e74c3c;
  font-size: 1rem;
}
</style>
