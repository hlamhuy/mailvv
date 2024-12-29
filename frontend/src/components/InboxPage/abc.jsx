import React, { useEffect, useState } from 'react';
import mailService from '../../services/mails';
import MailContainer from './MailContainer';

const Inbox = () => {
    const [mails, setMails] = useState([]);

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

    return (
        <div className='flex h-[85vh] px-20 py-10'>
            <table className='table-fixed w-full border-2 border-gray-600'>
                <thead className='bg-blue-900 border-2 border-gray-600'>
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
                <tbody className='border-2 border-gray-600 bg-neutral-800'>
                    <div className='overflow-y-auto h-[75vh] [&::-webkit-scrollbar]:w-0.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-400'>
                        {mails.map((mail) => (
                            <tr key={mail.id}>
                                <td className='p-4 border-b-2 border-gray-600'>
                                    <MailContainer
                                        id={mail.id}
                                        sender={mail.sender}
                                        subject={mail.subject}
                                        count={mail.count}
                                        date={mail.most_recent}
                                    />
                                </td>
                            </tr>
                        ))}
                    </div>
                    
                </tbody>
            </table>
        </div>
    );
};

export default Inbox;
