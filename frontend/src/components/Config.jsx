import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import accountService from '../services/accounts';

const Config = () => {
    const [accounts, setAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        accountService
            .getAllAccounts()
            .then((accounts) => {
                setAccounts(accounts);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the accounts!',
                    error
                );
            });
    }, []);

    const handleImport = (input) => {
        const newAccounts = input.split('\n').map((line) => {
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
            accountService
                .addAccount(account)
                .then((addedAccount) => {
                    setAccounts((existingAccounts) => [
                        ...existingAccounts,
                        addedAccount,
                    ]);
                })
                .catch((error) => {
                    console.error(
                        'There was an error adding the account!',
                        error
                    );
                });
        });
    };

    const getDomain = (email) => {
        const domain = email.split('@')[1];
        return domain;
    };

    const handleSyncAll = () => {
        accounts.forEach((account) => {
            accountService
                .syncAccount(account.id)
                .then((updatedAccount) => {
                    setAccounts((existingAccounts) =>
                        existingAccounts.map((existingAccount) =>
                            existingAccount.id === updatedAccount.id
                                ? updatedAccount
                                : existingAccount
                        )
                    );
                })
                .catch((error) => {
                    console.error(
                        'There was an error syncing the account!',
                        error
                    );
                });
        });
    };

    const handleDeleteAll = () => {
        accountService
            .removeAllAccounts()
            .then(() => {
                setAccounts([]);
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
            });
    };

    return (
        <div className='px-60 py-10'>
            <div className='flex justify-between w-full'>
                <div className='flex space-x-6'></div>
                <div className='flex space-x-6'>
                    <button
                        className='btn bg-green-500'
                        onClick={() => setIsModalOpen(true)}
                    >
                        Import
                    </button>
                    <button
                        className='btn bg-purple-600'
                        onClick={handleSyncAll}
                    >
                        Sync
                    </button>
                    <button
                        className='btn bg-red-500'
                        onClick={handleDeleteAll}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className='pt-10'>
                <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
                    <table className='w-full text-sm text-left text-gray-300'>
                        <thead className='text-sm bg-blue-900 text-gray-200'>
                            <tr>
                                <th scope='col' className='p-4'>
                                    <div className='flex items-center'>
                                        <input
                                            id='checkbox-all-search'
                                            type='checkbox'
                                            className='w-4 h-4'
                                        />
                                        <label className='sr-only'>
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Email
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Status
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Last Synced
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account) => (
                                <tr
                                    key={account.id}
                                    className=' odd:bg-gray-800  even:bg-gray-700 border-b border-gray-700'
                                >
                                    <td className='w-4 p-4'>
                                        <div className='flex items-center'>
                                            <input
                                                id='checkbox-table-search'
                                                type='checkbox'
                                                className='w-4 h-4'
                                            />
                                            <label className='sr-only'>
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-white'>
                                        {account.user}
                                    </td>
                                    <td
                                        className={
                                            account.alive !== null
                                                ? account.alive
                                                    ? 'px-6 py-4 text-green'
                                                    : 'px-6 py-4 text-red'
                                                : 'px-6 py-4 text-gray'
                                        }
                                    >
                                        {account.alive !== null
                                            ? account.alive
                                                ? 'Alive'
                                                : 'Dead'
                                            : '-'}
                                    </td>
                                    <td className='px-6 py-4'>
                                        {account.last_synced || '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
