import React, { useEffect, useState } from 'react';
import mailService from '../../services/mails';
import MailContainer from './MailContainer';
import { format as dateFormatter } from 'date-fns';

const Inbox = () => {
    const [mails, setMails] = useState([]);
    const [recipients, setRecipients] = useState([]);

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
                console.log(fetchedRecipients);
                setRecipients(fetchedRecipients);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the recipients!',
                    error
                );
            });
    };

    const handleRecipientClick = (uid) => {
        console.log('Recipient clicked: ', uid);
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
                                count={mail.count}
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
                            onClick={() => handleRecipientClick(recipient.uid)}
                        >
                            {recipient.recipient}
                        </div>
                    ))}
                </div>
                <div className='overflow-y-auto w-7/12 h-full [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400'>
                    content
                </div>
            </div>
        </div>
    );
};

export default Inbox;
