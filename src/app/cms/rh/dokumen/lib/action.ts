import AxiosInstance from "lib/axios";

export const createDokumen = async (dokumenData: any) => {
  try {
    const response = await AxiosInstance.post("/dokumen", dokumenData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editDokumen = async (dokumenData: any, id: string) => {
  try {
    const response = await AxiosInstance.put(`/dokumen/${id}`, dokumenData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const detailDokumen = async (dokumenData: any, id: string) => {
  try {
    const response = await AxiosInstance.get(`/dokumen/${id}`, dokumenData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDokumen = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/dokumen/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFilesToDokumen = async (id: string, files: File[]) => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await AxiosInstance.post(`/dokumen/${id}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDokumenFiles = async (dokumenId: string, fileIds: string[]) => {
  await AxiosInstance.delete(`/dokumen/${dokumenId}/files`, {
    data: fileIds,
  });
};

export const downloadDokumenFile = async (dokumenId: string, fileId: string) => {
  try {
    const response = await AxiosInstance.get(`/dokumen/${dokumenId}/files/${fileId}/download`, {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: response.headers["content-type"] });
    const downloadUrl = window.URL.createObjectURL(blob);

    const contentDisposition = response.headers["content-disposition"];
    let fileName = "file";

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Download gagal:", error);
    throw error;
  }
};
