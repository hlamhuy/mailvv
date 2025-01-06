import React, { useState } from 'react';
import { format as dateFormatter } from 'date-fns';

const MailContainer = ({ mails, handleMailClick }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredMails = mails.filter((mail) => {
        if (searchQuery.toLowerCase().startsWith('from: ')) {
            const senderQuery = searchQuery.slice(6).toLowerCase();
            return mail.sender.toLowerCase().includes(senderQuery);
        }
        return mail.subject.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className='flex flex-col w-3/12 h-auto'>
            <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                    <svg
                        className='w-4 h-4 text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                    </svg>
                </div>
                <input
                    type='text'
                    placeholder='Search mails'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='block w-full py-2 pl-8 text-sm border-b-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white indent-2'
                />
            </div>
            <div className='custom-scrollbar h-full'>
                {filteredMails.map((mail) => (
                    <div
                        key={mail.id}
                        className='flex p-4 border-b-2 border-gray-600 hover:bg-neutral-700'
                        onClick={() => handleMailClick(mail.id)}
                    >
                        <div
                            className={`mail-container-${mail.id} text-xs text-yellow-50`}
                        >
                            <div className='font-bold'>
                                ({mail.amount}) {mail.subject}
                            </div>
                            <div className='mail-sender'>{mail.sender}</div>
                            <div className='mail-date text-xs'>
                                {formatDate(mail.most_recent)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000);
    return dateFormatter(date, 'MM/dd/yyyy hh:mm:ss a');
};

export default MailContainer;
