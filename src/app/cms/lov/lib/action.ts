import { AxiosInstance } from "lib/axios";

export const createLov = async (lovData: any) => {
  try {
    const response = await AxiosInstance.post("/lov", lovData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editLov = async (lovData: any, id: string) => {
  try {
    const response = await AxiosInstance.put(`/lov/${id}`, lovData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailLov = async (lovData: any, id: string) => {
  try {
    const response = await AxiosInstance.get(`/lov/${id}`, lovData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLov = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/lov/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
