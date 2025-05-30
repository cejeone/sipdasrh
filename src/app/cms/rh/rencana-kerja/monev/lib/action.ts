import { AxiosInstancePepdas } from "lib/axios";

export const createMonev = async (monevData: any) => {
  try {
    const response = await AxiosInstancePepdas.post("/monev", monevData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editMonev = async (monevData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.put(`/monev/${id}`, monevData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailMonev = async (monevData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.get(`/monev/${id}`, monevData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMonev = async (id: string) => {
  try {
    const response = await AxiosInstancePepdas.delete(`/monev/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
