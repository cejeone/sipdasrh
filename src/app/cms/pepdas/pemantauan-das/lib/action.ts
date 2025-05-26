import { AxiosInstancePepdas } from "lib/axios";

export const createPemantauanDAS = async (pemantauanDASData: any) => {
  try {
    const response = await AxiosInstancePepdas.post("/pemantauan-das", pemantauanDASData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPemantauanDAS = async (pemantauanDASData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.put(`/pemantauan-das/${id}`, pemantauanDASData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailPemantauanDAS = async (pemantauanDASData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.get(`/pemantauan-das/${id}`, pemantauanDASData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePemantauanDAS = async (id: string) => {
  try {
    const response = await AxiosInstancePepdas.delete(`/pemantauan-das/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
