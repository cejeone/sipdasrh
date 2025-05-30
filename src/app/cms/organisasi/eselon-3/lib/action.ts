import { AxiosInstance } from "lib/axios";

export const createEselon3 = async (eselon3Data: any) => {
  try {
    const response = await AxiosInstance.post("/eselon3", eselon3Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEselon3 = async (eselon3Data: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/eselon3/${id}`, eselon3Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailEselon3 = async (eselon3Data: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/eselon3/${id}`, eselon3Data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEselon3 = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/eselon3/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
