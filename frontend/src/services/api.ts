import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export interface Message {
  _id?: string
  role: 'user' | 'ai'
  content: string
  createdAt?: string
}

export interface ChatResponse {
  reply: string
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/api/chat', { message })
  return response.data
}

export const fetchHistory = async (): Promise<Message[]> => {
  const response = await api.get<Message[]>('/api/history')
  return response.data
}

export const clearHistory = async (): Promise<void> => {
  await api.delete('/api/history')
}

export default api
