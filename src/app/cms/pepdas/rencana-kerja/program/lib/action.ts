import { AxiosInstancePepdas } from "lib/axios";

//program
export const createProgram = async (programsData: any) => {
  try {
    const response = await AxiosInstancePepdas.post("/programs", programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProgram = async (programsData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.put(`/programs/${id}`, programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailProgram = async (programsData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.get(`/programs/${id}`, programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProgram = async (id: string) => {
  try {
    const response = await AxiosInstancePepdas.delete(`/programs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//pagu anggaran
export const createPaguAnggaran = async (paguAnggaranData: any) => {
  try {
    const response = await AxiosInstancePepdas.post("/pagu-anggaran", paguAnggaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editPaguAnggaran = async (paguAnggaranData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.put(`/pagu-anggaran/${id}`, paguAnggaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailPaguAnggaran = async (paguAnggaranData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.get(`/pagu-anggaran/${id}`, paguAnggaranData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePaguAnggaran = async (id: string) => {
  try {
    const response = await AxiosInstancePepdas.delete(`/pagu-anggaran/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
