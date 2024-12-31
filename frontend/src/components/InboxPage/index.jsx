import React, { useEffect, useState } from 'react';
import mailService from '../../services/mails';
import MailContainer from './MailContainer';
import { format as dateFormatter } from 'date-fns';
import HtmlParser from 'html-react-parser';

const Inbox = () => {
    const [mails, setMails] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp * 1000);
        return dateFormatter(date, 'MM/dd/yyyy hh:mm:ss a');
    };

    useEffect(() => {
        mailService
            .getAllMails()
            .then((fetchedMails) => {
                setMails(fetchedMails);
            })
            .catch((error) => {
                console.error('There was an error fetching the mails!', error);
            });
    }, []);

    const handleMailClick = (mailId) => {
        mailService
            .getMailRecipients(mailId)
            .then((fetchedRecipients) => {
                setRecipients(fetchedRecipients);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the recipients!',
                    error
                );
            });
    };

    const handleRecipientClick = (uid, accountId) => {
        setLoading(true);
        //console.log('Passing: ', uid, accountId);
        mailService
            .getMailContent(uid, accountId)
            .then((fetchedContent) => {
                //console.log('Fetched content: ', fetchedContent);
                setContent(fetchedContent);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the content!',
                    error
                );
            });
    };

    return (
        <div className='block h-[85vh] px-20 py-10'>
            <table className='table-fixed w-full border-2 border-gray-600 '>
                <thead className='bg-blue-900'>
                    <tr>
                        <th className='w-3/12 p-4 border-2 border-gray-600'>
                            Mails
                        </th>
                        <th className='w-2/12 p-4 border-2 border-gray-600'>
                            Recipients
                        </th>
                        <th className='w-7/12 p-4 border-2 border-gray-600'>
                            Content
                        </th>
                    </tr>
                </thead>
            </table>
            <div className='inline-flex w-full h-[75vh] bg-neutral-800 border-t-0 border-2 border-gray-600'>
                <div className='overflow-y-auto w-3/12 h-full [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400 '>
                    {mails.map((mail) => (
                        <div
                            key={mail.id}
                            className='flex p-4 border-b-2 border-gray-600 hover:bg-neutral-700'
                            onClick={() => handleMailClick(mail.id)}
                        >
                            <MailContainer
                                id={mail.id}
                                sender={mail.sender}
                                subject={mail.subject}
                                amount={mail.amount}
                                date={formatDate(mail.most_recent)}
                            />
                        </div>
                    ))}
                </div>
                <div className='overflow-y-auto w-2/12 h-full [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400'>
                    {recipients.map((recipient, index) => (
                        <div
                            key={index}
                            className='p-1 pl-4 border-b-1 border-gray-600 text-xs hover:bg-neutral-700'
                            onClick={() =>
                                handleRecipientClick(
                                    recipient.uid,
                                    recipient.account_id
                                )
                            }
                        >
                            {recipient.recipient}
                        </div>
                    ))}
                </div>
                <div className='overflow-y-auto w-7/12 h-full [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400'>
                    {loading ? <div>Loading...</div> : HtmlParser(content)}
                </div>
            </div>
        </div>
    );
};

export default Inbox;
