import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:4000" : "");

const api = axios.create({ baseURL: API_URL, withCredentials: true });

api.interceptors.request.use(async (cfg) => {
  const token = localStorage.getItem("access_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  if (["post", "put", "patch", "delete"].includes((cfg.method || "").toLowerCase())) {
    try {
      const { data } = await axios.get(`${API_URL}/api/csrf-token`, { withCredentials: true });
      cfg.headers["x-csrf-token"] = data.csrfToken;
    } catch {
      // Si no se puede obtener el token CSRF, el servidor rechazará la petición
      // y el interceptor de respuesta notificará al usuario.
    }
  }
  return cfg;
});

api.interceptors.response.use(undefined, (err) => {
  if (err.response?.status === 401 && !window.location.pathname.startsWith("/login")) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("inclusia_session");
    window.location.href = "/login";
  }
  return Promise.reject(err);
});

export default api;