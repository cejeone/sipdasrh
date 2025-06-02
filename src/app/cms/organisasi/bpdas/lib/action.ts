import { AxiosInstance } from "lib/axios";

export const createBpdas = async (bpdasData: any) => {
  try {
    const response = await AxiosInstance.post("/bpdas", bpdasData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editBpdas = async (bpdasData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/bpdas/${id}`, bpdasData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailBpdas = async (bpdasData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/bpdas/${id}`, bpdasData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBpdas = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/bpdas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
