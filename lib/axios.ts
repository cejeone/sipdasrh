import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL; //superadmin/admin
const baseUrlPepdas = process.env.NEXT_PUBLIC_API_PEPDAS_URL;
const baseUrlRh = process.env.NEXT_PUBLIC_API_RH_URL;

console.log(baseUrl);
console.log(baseUrlPepdas);
console.log(baseUrlRh);

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInstancePepdas = axios.create({
  baseURL: baseUrlPepdas,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInstanceRh = axios.create({
  baseURL: baseUrlRh,
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

export { AxiosInstance, AxiosInstancePepdas, AxiosInstanceRh };
