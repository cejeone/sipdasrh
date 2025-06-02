import { AxiosInstance } from "lib/axios";

export const createKelurahanDesa = async (kelurahanDesaData: any) => {
  try {
    const response = await AxiosInstance.post("/kelurahan-desa", kelurahanDesaData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editKelurahanDesa = async (kelurahanDesaData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/kelurahan-desa/${id}`, kelurahanDesaData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailKelurahanDesa = async (kelurahanDesaData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/kelurahan-desa/${id}`, kelurahanDesaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteKelurahanDesa = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/kelurahan-desa/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
