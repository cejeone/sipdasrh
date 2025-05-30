import { AxiosInstance } from "lib/axios";

export const createProvinsi = async (provinsiData: any) => {
  try {
    const response = await AxiosInstance.post("/provinsi", provinsiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProvinsi = async (provinsiData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/provinsi/${id}`, provinsiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailProvinsi = async (provinsiData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/provinsi/${id}`, provinsiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProvinsi = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/provinsi/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
