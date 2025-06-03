import { AxiosInstance } from "lib/axios";

export const createLov = async (lovData: any) => {
  try {
    const response = await AxiosInstance.post("/lovs", lovData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editLov = async (lovData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/lovs/${id}`, lovData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailLov = async (lovData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/lovs/${id}`, lovData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLov = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/lovs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
