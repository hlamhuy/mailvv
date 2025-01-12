import axios from 'axios';
const baseUrl = '/api/accounts';

const getAllAccounts = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const addAccount = async (account) => {
    const response = await axios.post(baseUrl, account);
    return response.data;
};
const removeAccounts = async (ids) => {
    const response = await axios.delete(baseUrl, { data: { ids } });
    return response.data;
};

const removeAllAccounts = async () => {
    const response = await axios.delete(`${baseUrl}/all`);
    return response.data;
};

const syncAccount = async (id) => {
    const response = await axios.post(`${baseUrl}/sync/${id}`);
    return response.data;
};

export default {
    getAllAccounts,
    removeAccounts,
    addAccount,
    removeAllAccounts,
    syncAccount,
};
