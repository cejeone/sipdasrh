import { AxiosInstanceRh } from "lib/axios";

export const createMonevPusat = async (monevPusatData: any) => {
  try {
    const response = await AxiosInstanceRh.post("/monev-pusat", monevPusatData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editMonevPusat = async (monevPusatData: any, id: string) => {
  try {
    const response = await AxiosInstanceRh.put(`/monev-pusat/${id}`, monevPusatData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailMonevPusat = async (monevPusatData: any, id: string) => {
  try {
    const response = await AxiosInstanceRh.get(`/monev-pusat/${id}`, monevPusatData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMonevPusat = async (id: string) => {
  try {
    const response = await AxiosInstanceRh.delete(`/monev-pusat/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
