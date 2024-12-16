import React, { useState } from 'react';

const ActionBar = ({
    onImport,
    onSyncAll,
    onDeleteAll,
    onSyncSelected,
    onDeleteSelected,
    selectedAccounts,
}) => {
    const [isFilterSelect, setIsFilterSelect] = useState(false);
    const [isActionSelect, setIsActionSelect] = useState(false);

    const toggleFilter = () => {
        setIsFilterSelect(!isFilterSelect);
    };
    const toggleAction = () => {
        setIsActionSelect(!isActionSelect);
    };

    return (
        <div className='flex items-center mx-auto justify-between w-full'>
            {/* Search bar */}
            <div>
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
                        className='block py-2 pl-10 text-sm border rounded-lg w-80 bg-gray-700 border-gray-600 placeholder-gray-400 text-white'
                        placeholder='Search for items'
                    />
                </div>
            </div>
            {/* Group Filter */}
            <div className='ml-2 relative'>
                <button
                    id='filter-button'
                    className='rounded-lg px-3 py-3 bg-gray-700 hover:bg-gray-600 '
                    type='button'
                    onClick={toggleFilter}
                >
                    <svg
                        className='w-4 h-4'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                    </svg>
                </button>
                {isFilterSelect && (
                    <div className='absolute z-10 w-48 divide-y rounded-lg shadow bg-gray-700 divide-gray-600 mt-2'>
                        <div className='p-3 space-y-3 text-sm text-gray-200'>
                            <FilterOption label='Gmail' id='gmail' />
                            <FilterOption label='Yahoo' id='yahoo' />
                            <FilterOption label='iCloud' id='icloud' />
                            <FilterOption label='Hotmail' id='hotmail' />
                        </div>
                    </div>
                )}
            </div>
            {/* Action buttons */}
            <div className='ml-auto relative inline-block text-left z-30'>
                <button
                    id='action-button'
                    className='rounded-lg px-4 py-2 bg-blue-800 hover:bg-blue-900 inline-flex items-center gap-x-1.5 justify-center'
                    type='button'
                    onClick={toggleAction}
                >
                    Action
                    <svg
                        className='w-2.5 h-2.5 ml-1'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 10 6'
                    >
                        <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m1 1 4 4 4-4'
                        />
                    </svg>
                </button>
                {isActionSelect && (
                    <div className='absolute origin-top-right z-10 w-48 divide-y rounded-lg shadow right-0 mt-2 bg-blue-500 divide-gray-600'>
                        <div className='py-2'>
                            <Action label='Import' onClick={onImport} />
                            <Action
                                label='Sync Selected'
                                onClick={onSyncSelected}
                                disabled={selectedAccounts.length === 0}
                            />
                            <Action
                                label='Delete Selected'
                                onClick={onDeleteSelected}
                                disabled={selectedAccounts.length === 0}
                            />
                            <Action label='Sync All' onClick={onSyncAll} />
                            <Action label='Delete All' onClick={onDeleteAll} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const FilterOption = ({ label, id }) => {
    const [checked, setChecked] = useState(false);

    const handleOptionClick = () => {
        setChecked(!checked);
    };

    const handleCheckboxClick = (event) => {
        event.stopPropagation();
        setChecked(!checked);
    };
    return (
        <div
            className='flex items-center cursor-pointer'
            onClick={handleOptionClick}
        >
            <input
                id={`checkbox-${id}`}
                type='checkbox'
                className='w-4 h-4 rounded :bg-gray-600 border-gray-500'
                checked={checked}
                onChange={handleCheckboxClick}
            />
            <label
                htmlFor={`checkbox-${id}`}
                className='ml-2 text-sm font-medium  text-gray-300'
            >
                {label}
            </label>
        </div>
    );
};

const Action = ({ label, onClick, disabled }) => {
    return (
        <div
            className={`block px-4 py-2 text-sm ${
                disabled
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-white cursor-default hover:bg-blue-400'
            } bg-blue-500`}
            role='menuitem'
            tabIndex='-1'
            id='menu-item-0'
            onClick={!disabled ? onClick : undefined}
        >
            {label}
        </div>
    );
};
export default ActionBar;
