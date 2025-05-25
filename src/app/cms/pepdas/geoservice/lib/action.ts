import { AxiosInstancePepdas } from "lib/axios";

export const createGeoservices = async (geoservicesData: any) => {
  try {
    const response = await AxiosInstancePepdas.post("/geoservices", geoservicesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editGeoservices = async (geoservicesData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.put(`/geoservices/${id}`, geoservicesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailGeoservices = async (geoservicesData: any, id: string) => {
  try {
    const response = await AxiosInstancePepdas.get(`/geoservices/${id}`, geoservicesData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGeoservices = async (id: string) => {
  try {
    const response = await AxiosInstancePepdas.delete(`/geoservices/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
