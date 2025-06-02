import { AxiosInstance } from "lib/axios";

export const createKecamatan = async (kecamatanData: any) => {
  try {
    const response = await AxiosInstance.post("/kecamatan", kecamatanData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editKecamatan = async (kecamatanData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/kecamatan/${id}`, kecamatanData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailKecamatan = async (kecamatanData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/kecamatan/${id}`, kecamatanData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteKecamatan = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/kecamatan/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
