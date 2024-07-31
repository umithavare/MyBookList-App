<template>
  <div class="books-page">
    <div class="form-container">
      <h1>Books</h1>
      <form @submit.prevent="addBook">
        <input v-model="title" placeholder="Title" />
        <input v-model="author" placeholder="Author" />
        <button type="submit" class="btn">Add Book</button>
      </form>
    </div>
    <div class="books-list">
      <ul>
        <li v-for="book in books" :key="book.id">
          <span>{{ book.title }} by {{ book.author }}</span>
          <div class="buttons">
            <button @click="openEditModal(book)" class="btn edit">Edit</button>
            <button @click="openDeleteModal(book.id)" class="btn delete">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Edit Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h2>Edit Book</h2>
        <form @submit.prevent="updateBook">
          <input v-model="title" placeholder="Title" />
          <input v-model="author" placeholder="Author" />
          <button type="submit" class="btn">Update Book</button>
          <button type="button" class="btn cancel" @click="closeModal">
            Cancel
          </button>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="modal-overlay"
      @click="closeDeleteModal"
    >
      <div class="modal" @click.stop>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this book?</p>
        <div class="btn-container">
          <button @click="confirmDeleteBook" class="btn delete">Delete</button>
          <button @click="closeDeleteModal" class="btn cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'BooksPage',
  setup() {
    const books = ref<any[]>([]);
    const title = ref('');
    const author = ref('');
    const editingBook = ref<any | null>(null);
    const isModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const bookIdToDelete = ref<string | null>(null);
    const authStore = useAuthStore();
    const errorMessage = ref('');

    const loadBooks = async () => {
      try {
        books.value = await api.getBooks();
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to load books: ${error.message}`;
        } else {
          errorMessage.value =
            'Failed to load books: An unknown error occurred';
        }
      }
    };

    const addBook = async () => {
      try {
        if (editingBook.value) {
          await api.updateBook(editingBook.value.id, {
            title: title.value,
            author: author.value,
          });
          editingBook.value = null;
        } else {
          await api.addBook({ title: title.value, author: author.value });
        }
        title.value = '';
        author.value = '';
        await loadBooks();
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to add book: ${error.message}`;
        } else {
          errorMessage.value = 'Failed to add book: An unknown error occurred';
        }
      }
    };

    const updateBook = async () => {
      try {
        if (editingBook.value) {
          await api.updateBook(editingBook.value.id, {
            title: title.value,
            author: author.value,
          });
          editingBook.value = null;
          closeModal();
          await loadBooks();
        }
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to update book: ${error.message}`;
        } else {
          errorMessage.value =
            'Failed to update book: An unknown error occurred';
        }
      }
    };

    const deleteBook = async (id: string) => {
      try {
        await api.deleteBook(id);
        await loadBooks();
        closeDeleteModal();
      } catch (error) {
        if (error instanceof Error) {
          errorMessage.value = `Failed to delete book: ${error.message}`;
        } else {
          errorMessage.value =
            'Failed to delete book: An unknown error occurred';
        }
      }
    };

    const openEditModal = (book: any) => {
      title.value = book.title;
      author.value = book.author;
      editingBook.value = book;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      editingBook.value = null;
      title.value = '';
      author.value = '';
    };

    const openDeleteModal = (id: string) => {
      bookIdToDelete.value = id;
      isDeleteModalOpen.value = true;
    };

    const closeDeleteModal = () => {
      isDeleteModalOpen.value = false;
      bookIdToDelete.value = null;
    };

    const confirmDeleteBook = async () => {
      if (bookIdToDelete.value) {
        await deleteBook(bookIdToDelete.value);
      }
    };

    onMounted(loadBooks);

    return {
      books,
      title,
      author,
      addBook,
      updateBook,
      confirmDeleteBook,
      openEditModal,
      closeModal,
      openDeleteModal,
      closeDeleteModal,
      isModalOpen,
      isDeleteModalOpen,
      isAuthenticated: authStore.isAuthenticated,
      errorMessage,
    };
  },
});
</script>

<style scoped>
.books-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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

.books-list {
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn.edit {
  background: #f39c12;
}

.btn.edit:hover {
  background: #e67e22;
}

.btn.delete {
  background: #e74c3c;
}

.btn.delete:hover {
  background: #c0392b;
}

.error {
  color: #e74c3c;
  margin-top: 20px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.modal h2 {
  margin-bottom: 20px;
  text-align: center;
}

.modal p {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.modal .btn-container {
  display: flex;
  justify-content: space-between; /* Distribute space between the buttons */
  margin-top: 10px;
}

.modal .btn {
  flex: 1;
  margin: 0 5px; /* Add space between the buttons */
}

.modal .btn:first-child {
  margin-left: 0;
}

.modal .btn:last-child {
  margin-right: 0;
}

.modal .btn.cancel {
  background: #07eb12;
}

.modal .btn.cancel:hover {
  background: #c0392b;
}
</style>
