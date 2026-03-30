const API_BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

function setToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

function clearToken(): void {
  localStorage.removeItem('auth_token');
}

export const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) =>
      request<{ data: { user: import('@/types').User; token: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),

    register: (email: string, password: string, name: string) =>
      request<{ data: { user: import('@/types').User; token: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
      }),

    me: () =>
      request<{ data: { user: import('@/types').User; token: string } }>('/auth/me', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
  },

  // Token helpers
  getToken,
  setToken,
  clearToken,
};