import { AxiosInstance } from "lib/axios";

export const createKabupaten = async (kabupatenData: any) => {
  try {
    const response = await AxiosInstance.post("/kabupaten-kota", kabupatenData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editKabupaten = async (kabupatenData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/kabupaten-kota/${id}`, kabupatenData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailKabupaten = async (kabupatenData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/kabupaten-kota/${id}`, kabupatenData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteKabupaten = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/kabupaten-kota/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
