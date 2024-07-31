import PocketBase from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

export default {
  async getBooks() {
    const records = await pb.collection('books').getFullList();
    return records;
  },
  async addBook(book: { title: string; author: string }) {
    const record = await pb.collection('books').create(book);
    return record;
  },
  async updateBook(id: string, book: { title: string; author: string }) {
    const record = await pb.collection('books').update(id, book);
    return record;
  },
  async deleteBook(id: string) {
    await pb.collection('books').delete(id);
  },
  async registerUser(user: { email: string; password: string }) {
    try {
      const record = await pb.collection('users').create({
        email: user.email,
        password: user.password,
        passwordConfirm: user.password,
      });
      return record;
    } catch (error) {
      console.error('Failed to register user:', error);
      throw error;
    }
  },
  async loginUser(email: string, password: string) {
    try {
      const authData = await pb
        .collection('users')
        .authWithPassword(email, password);
      pb.authStore.save(authData.token, authData.record);
      return authData;
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  },
  logoutUser() {
    pb.authStore.clear();
  },
};
