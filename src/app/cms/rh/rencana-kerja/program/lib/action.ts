import { AxiosInstanceRh } from "lib/axios";

//program
export const createProgram = async (programsData: any) => {
  try {
    const response = await AxiosInstanceRh.post("/programs", programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProgram = async (programsData: any, id: string) => {
  try {
    const response = await AxiosInstanceRh.put(`/programs/${id}`, programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailProgram = async (programsData: any, id: string) => {
  try {
    const response = await AxiosInstanceRh.get(`/programs/${id}`, programsData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProgram = async (id: string) => {
  try {
    const response = await AxiosInstanceRh.delete(`/programs/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
