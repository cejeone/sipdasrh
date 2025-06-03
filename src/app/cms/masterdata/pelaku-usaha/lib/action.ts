import { AxiosInstance } from "lib/axios";

export const createPelakuUsaha = async (pelakuUsahaData: any) => {
  try {
    const response = await AxiosInstance.post("/pelaku-usaha", pelakuUsahaData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPelakuUsaha = async (pelakuUsahaData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/pelaku-usaha/${id}`, pelakuUsahaData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailPelakuUsaha = async (pelakuUsahaData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/pelaku-usaha/${id}`, pelakuUsahaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePelakuUsaha = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/pelaku-usaha/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
