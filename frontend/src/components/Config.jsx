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

    const handleSync = () => {};

    const handleDelete = () => {
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
                    <button className='btn bg-purple-600' onClick={handleSync}>
                        Sync
                    </button>
                    <button className='btn bg-red-500' onClick={handleDelete}>
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
                                        <label
                                            for='checkbox-all-search'
                                            className='sr-only'
                                        >
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
                                    <td class='w-4 p-4'>
                                        <div className='flex items-center'>
                                            <input
                                                id='checkbox-table-search'
                                                type='checkbox'
                                                class='w-4 h-4'
                                            />
                                            <label
                                                for='checkbox-table-search'
                                                class='sr-only'
                                            >
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
            <nav
                class='flex items-center flex-column flex-wrap md:flex-row justify-between pt-4'
                aria-label='Table navigation'
            >
                <span class='text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto'>
                    Showing{' '}
                    <span class='font-semibold text-gray-900 dark:text-white'>
                        1-10
                    </span>{' '}
                    of{' '}
                    <span class='font-semibold text-gray-900 dark:text-white'>
                        1000
                    </span>
                </span>
                <ul class='inline-flex -space-x-px rtl:space-x-reverse text-sm h-8'>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            Previous
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            1
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            2
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            aria-current='page'
                            class='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                        >
                            3
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            4
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            5
                        </a>
                    </li>
                    <li>
                        <a
                            href='#'
                            class='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleImport}
            />
        </div>
    );
};

export default Config;
