import { AxiosInstancePepdas, AxiosInstanceRh } from "./axios";

export const fetcherPepdas = (url: string) => AxiosInstancePepdas.get(url).then((res) => res.data);

export const fetcherRh = (url: string) => AxiosInstanceRh.get(url).then((res) => res.data);
