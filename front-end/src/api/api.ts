import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5432/monday-task-api/',
  headers: { 'Content-Type': 'application/json' },
})

export { api }