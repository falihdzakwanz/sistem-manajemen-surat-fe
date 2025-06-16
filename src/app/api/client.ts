const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors || "Request failed");
    }

    return response.json();
  },

  async get(endpoint: string, token?: string) {
    const headers = token ? { "X-API-TOKEN": token } : undefined;
    return this.request(endpoint, { method: "GET", headers });
  },

  async post(endpoint: string, body: any, token?: string) {
    const headers = token ? { "X-API-TOKEN": token } : undefined;
    return this.request(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  },

  async put(endpoint: string, body: any, token?: string) {
    const headers = token ? { "X-API-TOKEN": token } : undefined;
    return this.request(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  },

  async patch(endpoint: string, body: any, token?: string) {
    const headers = token ? { "X-API-TOKEN": token } : undefined;
    return this.request(endpoint, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
  },

  async delete(endpoint: string, token?: string) {
    const headers = token ? { "X-API-TOKEN": token } : undefined;
    return this.request(endpoint, { method: "DELETE", headers });
  },

  async upload(endpoint: string, formData: FormData, token: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-API-TOKEN": token,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors || "Upload failed");
    }

    return response.json();
  },
};
