import React, { useState } from 'react';
import { format as dateFormatter } from 'date-fns';
import PageNavigation from './PageNavigation';
const ConfigTable = ({
    accounts,
    selectedAccounts,
    handleSelectAll,
    handleSelectAccount,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedAccountsPage = accounts.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const totalPages = Math.ceil(accounts.length / itemsPerPage);

    const handleClickPage = (page) => {
        setCurrentPage(page);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
        return dateFormatter(date, 'MM/dd/yyyy hh:mm:ss a');
    };

    return (
        <div className='pt-6'>
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
                                        onChange={handleSelectAll}
                                        checked={
                                            selectedAccounts.length ===
                                            accounts.length
                                        }
                                    />
                                    <label className='sr-only'>checkbox</label>
                                </div>
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Email
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Mail Amount
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Last Synced
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedAccountsPage.map((account) => (
                            <tr
                                key={account.id}
                                className='odd:bg-gray-800 even:bg-gray-700 border-b border-gray-700'
                            >
                                <td className='w-4 p-4'>
                                    <div className='flex items-center'>
                                        <input
                                            id={`checkbox-${account.id}`}
                                            type='checkbox'
                                            className='w-4 h-4'
                                            onChange={(event) =>
                                                handleSelectAccount(
                                                    event,
                                                    account.id
                                                )
                                            }
                                            checked={selectedAccounts.includes(
                                                account.id
                                            )}
                                        />
                                        <label className='sr-only'>
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-white'>
                                    {account.user}
                                </td>
                                <td className='px-6 py-4'>
                                    <div
                                        className={`w-4 h-4 rounded-full ml-3 ${
                                            account.alive === null
                                                ? 'bg-orange-500'
                                                : account.alive
                                                ? 'bg-green-500'
                                                : 'bg-red-500'
                                        }`}
                                    ></div>
                                </td>
                                <td className='px-6 py-4'>
                                    {account.amount === 0
                                        ? '0'
                                        : account.amount}
                                </td>
                                <td className='px-6 py-4'>
                                    {account.last_synced === null
                                        ? 'Never'
                                        : formatDate(account.last_synced)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PageNavigation
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                accountsLength={accounts.length}
                handleClickPage={handleClickPage}
            />
        </div>
    );
};

export default ConfigTable;
