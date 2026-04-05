import axios from "axios";



const API = axios.create({
    baseURL: "http://localhost:5000/api"
});

export const getFinanceRecords = (token, type, page, search) => {

    return API.get(
        `/finance?type=${type}&page=${page}&limit=5&search=${search}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};

export const deleteFinanceRecord = (id, token) => {
    return API.delete(`/finance/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const addFinanceRecord = (data, token) => {
    return API.post("/finance", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const updateFinanceRecord = (id, data, token) => {
    return API.put(`/finance/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};