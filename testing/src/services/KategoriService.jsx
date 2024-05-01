import api from "./api";

export const findAllKategori = async () => {
    return await api.get("/api/get/category");
}

export const createKategori = async (kategori) => {
    return await api.post("/api/category", kategori);
}

export const updateKategori = async(kategori) => {
    return await api.put(`/api/category/${kategori.id}`, kategori);
}

export const deleteKategoriById = async(id) => {
    return await api.delete(`/api/category/${id}`);
}