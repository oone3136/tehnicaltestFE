import api from "./api";

export const findAllProduk = async (search, limit, offset) => {
    const url = `/api/get/product?search=${search}&limit=${limit}&offset=${offset}`;
    return await api.get(url);
}

export const findProdukById = async (id) => {
    return await api.get(`/api/product/${id}`);
}

export const createProduk = async (product) => {
    return await api.post("/api/product", product);
}

export const updateProduk = async(product) => {
    return await api.put(`/api/product/${product.id}`, product);
}

export const deleteProdukById = async(id) => {
    return await api.delete(`/api/product/${id}`);
}