import { AxiosInstance } from "lib/axios";

export const createKelompokMasyarakat = async (kelompokMasyarakatData: any) => {
  try {
    const response = await AxiosInstance.post("/kelompok-masyarakat", kelompokMasyarakatData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editKelompokMasyarakat = async (kelompokMasyarakatData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/kelompok-masyarakat/${id}`, kelompokMasyarakatData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailKelompokMasyarakat = async (kelompokMasyarakatData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/kelompok-masyarakat/${id}`, kelompokMasyarakatData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteKelompokMasyarakat = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/kelompok-masyarakat/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
