import { AxiosInstance } from "lib/axios";

export const createEselon1 = async (eselon1Data: any) => {
  try {
    const response = await AxiosInstance.post("/eselon1", eselon1Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEselon1 = async (eselon1Data: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/eselon1/${id}`, eselon1Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailEselon1 = async (eselon1Data: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/eselon1/${id}`, eselon1Data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEselon1 = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/eselon1/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
