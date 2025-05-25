import AxiosInstance from "./axios";

export const fetcher = (url: string) => AxiosInstance.get(url).then((res) => res.data);
