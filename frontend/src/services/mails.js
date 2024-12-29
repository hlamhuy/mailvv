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

const getMailUid = async (id) => {
}

export default {
    getAllMails,
    getMailRecipients,
};