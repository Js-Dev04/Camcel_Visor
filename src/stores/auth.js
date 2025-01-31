import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const nombre = ref(localStorage.getItem('nombre') || '');
  const token = ref(localStorage.getItem('token') || '');

  const login = async (nombre, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { nombre, password });
      token.value = response.data.token;
      nombre.value = response.data.nombre;
      localStorage.setItem('token', token.value);
      localStorage.setItem('nombre', nombre.value);
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  const logout = () => {
    token.value = '';
    user.value = null;
    localStorage.removeItem('token');
  };

  return { user, token, login, logout };
});
