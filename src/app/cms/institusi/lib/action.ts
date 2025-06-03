import { AxiosInstance } from "lib/axios";

export const createInstitusi = async (InstitusiData: any) => {
  try {
    const response = await AxiosInstance.post("/institusi", InstitusiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editInstitusi = async (InstitusiData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/institusi/${id}`, InstitusiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailInstitusi = async (InstitusiData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/institusi/${id}`, InstitusiData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteInstitusi = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/institusi/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
