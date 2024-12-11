import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const Config = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios
            .get('/api/accounts')
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the accounts!',
                    error
                );
            });
    }, []);

    const handleImport = (inputValue) => {
        const newAccounts = inputValue.split('\n').map((line) => {
            const [user, pass] = line.split(':');
            return {
                user,
                pass,
                domain: getDomain(user),
                alive: null,
                last_synced: null,
            };
        });

        newAccounts.forEach((account) => {
            axios.post('/api/accounts', account).catch((error) => {
                console.error('There was an error adding the account!', error);
            });
        });
    };

    const getDomain = (email) => {
        const domain = email.split('@')[1];
        return domain;
    };

    return (
        <div className='px-60 py-10'>
            <div className='flex justify-between w-full'>
                <div className='flex space-x-6'>
                    <button className='btn bg-orange-500'>All</button>
                    <button className='btn bg-orange-500'>Gmail</button>
                    <button className='btn bg-orange-500'>Hotmail</button>
                    <button className='btn bg-orange-500'>Yahoo</button>
                    <button className='btn bg-orange-500'>iCloud</button>
                </div>
                <div className='flex space-x-6'>
                    <button
                        className='btn bg-green-500'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Import
                    </button>
                    <button className='btn bg-purple-600'>Sync</button>
                </div>
            </div>
            <div className='py-6 table w-full'>
                <table className='mt-4 min-w-full border-separate border-spacing-0 divide-y'>
                    <thead>
                        <tr>
                            <th className='text-left'>Email</th>
                            <th className='text-left'>Status</th>
                            <th className='text-left'>Last Sync</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id}>
                                <td>{account.user}</td>
                                <td
                                    className={
                                        account.alive !== null
                                            ? account.alive
                                                ? 'text-green'
                                                : 'text-red'
                                            : 'text-gray'
                                    }
                                >
                                    {account.alive !== null
                                        ? account.alive
                                            ? 'Alive'
                                            : 'Dead'
                                        : '-'}
                                </td>
                                <td>{account.last_synced || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleImport}
            />
        </div>
    );
};

export default Config;
