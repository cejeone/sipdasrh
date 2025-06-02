import { AxiosInstance } from "lib/axios";

export const createKonfigurasiSistem = async (integrasiData: any) => {
  try {
    const response = await AxiosInstance.post("/integrasi", integrasiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editKonfigurasiSistem = async (integrasiData: any, id: string) => {
  try {
    const response = await AxiosInstance.put(`/konfigurasi-sistem/${id}`, integrasiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailKonfigurasiSistem = async (integrasiData: any, id: string) => {
  try {
    const response = await AxiosInstance.get(`/konfigurasi-sistem/${id}`, integrasiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteKonfigurasiSistem = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/konfigurasi-sistem/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
