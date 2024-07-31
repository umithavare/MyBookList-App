<template>
  <div class="home">
    <div class="welcome-container">
      <h1>Welcome to MyBookList App</h1>
      <p>
        This application allows you to manage your personal book collection. It
        is powered by PocketBase, a fast and lightweight database solution.
      </p>
      <router-link to="/books" class="btn">View Books</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
});
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #00c6ff, #0072ff);
  color: white;
  font-family: 'Arial', sans-serif;
}

.welcome-container {
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 40px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background: #0072ff;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s;
}

.btn:hover {
  background: #005bb5;
}
</style>
