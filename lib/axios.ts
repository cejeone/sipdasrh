import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// get token
export function setupInterceptor() {
  const router = useRouter();

  AxiosInstance.interceptors.request.use(
    async (config) => {
      if (typeof window !== "undefined") {
        const token = getCookie("accessToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        deleteCookie("accessToken");
        router.push("/login");
      }

      return Promise.reject(error);
    }
  );
}

export default AxiosInstance;
