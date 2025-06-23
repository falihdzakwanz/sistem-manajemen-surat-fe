const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const apiClient = {
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    
    const headers = {
      "Content-Type": "application/json",
      ...(token && { "X-API-TOKEN": token }),
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });
    console.log(response);
    if (!response.ok) {
      // Handle 401 unauthorized
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // window.location.href = '/login';
      }
      
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors || "Request failed");
    }

    return response.json();
  },

  async get(endpoint: string) {
    return this.request(endpoint, { method: "GET" });
  },

  async post(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  async put(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  },

  async patch(endpoint: string, body: any) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  async delete(endpoint: string) {
    return this.request(endpoint, { method: "DELETE" });
  },

  async upload(endpoint: string, formData: FormData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "X-API-TOKEN": token || "",
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