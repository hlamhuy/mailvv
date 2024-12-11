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
const removeAccount = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};

const removeAllAccounts = async () => {
    const response = await axios.delete(baseUrl);
    return response.data;
};

export default {
    getAllAccounts,
    removeAccount,
    addAccount,
    removeAllAccounts,
};
