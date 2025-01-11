import axios from 'axios';
const baseUrl = '/api/mails';

const getAllMails = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getMailRecipients = async (mailId) => {
    const response = await axios.get(`${baseUrl}/${mailId}`);
    return response.data;
};

const getMailContent = async (uid, accountId) => {
    const response = await axios.post(`${baseUrl}/content/${uid}`, {
        uid,
        account_id: accountId,
    });
    return response.data;
};

export default {
    getAllMails,
    getMailRecipients,
    getMailContent,
};
