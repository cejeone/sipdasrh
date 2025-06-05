import { AxiosInstance } from "lib/axios";

export const createIntegrasi = async (integrasiData: any) => {
  try {
    const response = await AxiosInstance.post("/integrasi", integrasiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editIntegrasi = async (integrasiData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/integrasi/${id}`, integrasiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailIntegrasi = async (integrasiData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/integrasi/${id}`, integrasiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteIntegrasi = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/integrasi/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
