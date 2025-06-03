import { AxiosInstance } from "lib/axios";

export const createPeran = async (peranData: any) => {
  try {
    const response = await AxiosInstance.post("/peran", peranData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPeran = async (peranData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/peran/${id}`, peranData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailPeran = async (peranData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/peran/${id}`, peranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePeran = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/peran/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
