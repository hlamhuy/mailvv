import React, { useState } from 'react';
import ActionButton from './ActionButton';
import ActionMessage from './ActionMessage';

const ActionBar = ({
    onImport,
    onExport,
    onSyncAll,
    onDeleteAll,
    onSyncSelected,
    onDeleteSelected,
    onDeleteDead,
    onSearch,
    selectedAccounts,
    message,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className='flex flex-row items-center mx-auto w-full'>
            {/* Search bar */}
            <div className='w-[28vw]'>
                <label htmlFor='table-search' className='sr-only'>
                    Search
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
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
                        id='table-search'
                        className='block py-2 pl-10 text-sm border rounded-lg w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
                        placeholder='Search email'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            {/* Selected accounts count */}
            <ActionMessage
                message={message}
            />
            {/* Action buttons */}
            <div className='ml-auto'>
                <ActionButton
                    onImport={onImport}
                    onExport={onExport}
                    onSyncAll={onSyncAll}
                    onDeleteAll={onDeleteAll}
                    onSyncSelected={onSyncSelected}
                    onDeleteSelected={onDeleteSelected}
                    onDeleteDead={onDeleteDead}
                    selectedAccounts={selectedAccounts}
                />
            </div>
        </div>
    );
};

export default ActionBar;
