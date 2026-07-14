const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'

interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  errors?: { field: string; message: string }[]
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        error: data.message || 'Something went wrong',
        errors: data.errors,
      }
    }

    return { data }
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return { error: 'Unable to connect to server. Please try again later.' }
    }
    return { error: 'Network error. Please check your connection.' }
  }
}

export interface SignupInput {
  name: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt?: string
}

export interface AuthResponse {
  message: string
  user: User
}

export interface ForgotPasswordResponse {
  message: string
  resetUrl?: string
}

export interface ResetPasswordInput {
  token: string
  password: string
}

export interface ConnectTelegramInput {
  botToken: string
}

export interface BotConnection {
  id: string
  platform: 'TELEGRAM'
  status: 'PENDING_TOKEN' | 'ACTIVE' | 'ERROR' | 'DISCONNECTED'
  credentials: {
    botUsername?: string
  }
  createdAt: string
  updatedAt: string
}

export const authApi = {
  signup(input: SignupInput) {
    return request<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  login(input: LoginInput) {
    return request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  logout() {
    return request<{ message: string }>('/auth/logout', {
      method: 'POST',
    })
  },

  getMe() {
    return request<{ user: User }>('/auth/me')
  },

  forgotPassword(email: string) {
    return request<ForgotPasswordResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },

  resetPassword(input: ResetPasswordInput) {
    return request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },
}

export const botConnectionApi = {
  connectTelegram(input: ConnectTelegramInput) {
    return request<{ message: string; connection: BotConnection }>('/bot-connections/telegram', {
      method: 'POST',
      body: JSON.stringify(input),
    })
  },

  listConnections() {
    return request<{ connections: BotConnection[] }>('/bot-connections')
  },

  getConnection(id: string) {
    return request<{ connection: BotConnection }>(`/bot-connections/${id}`)
  },

  disconnectBot(id: string) {
    return request<{ message: string }>(`/bot-connections/${id}`, {
      method: 'DELETE',
    })
  },
}