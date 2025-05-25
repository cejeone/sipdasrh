import { AxiosInstanceRh } from "./axios";

export const fetcherRh = (url: string) => AxiosInstanceRh.get(url).then((res) => res.data);
