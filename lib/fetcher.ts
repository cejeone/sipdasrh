import { AxiosInstance, AxiosInstancePepdas, AxiosInstanceRh } from "./axios";

export const fetcherSuperadmin = (url: string) => AxiosInstance.get(url).then((res) => res.data);

export const fetcherPepdas = (url: string) => AxiosInstancePepdas.get(url).then((res) => res.data);

export const fetcherRh = (url: string) => AxiosInstanceRh.get(url).then((res) => res.data);
