import { AxiosInstance } from "lib/axios";

export const createBpth = async (bpthData: any) => {
  try {
    const response = await AxiosInstance.post("/bpth", bpthData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editBpth = async (bpthData: any, id: number) => {
  try {
    const response = await AxiosInstance.put(`/bpth/${id}`, bpthData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailBpth = async (bpthData: any, id: number) => {
  try {
    const response = await AxiosInstance.get(`/bpth/${id}`, bpthData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBpth = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/bpth/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
