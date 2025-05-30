import { AxiosInstance } from "lib/axios";

export const createEselon2 = async (eselon2Data: any) => {
  try {
    const response = await AxiosInstance.post("/eselon2", eselon2Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEselon2 = async (eselon2Data: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/eselon2/${id}`, eselon2Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailEselon2 = async (eselon2Data: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/eselon2/${id}`, eselon2Data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEselon2 = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/eselon2/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
