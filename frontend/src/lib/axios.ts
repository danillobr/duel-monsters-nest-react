import axios from 'axios'

export const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_REACT_API_URL,
})
