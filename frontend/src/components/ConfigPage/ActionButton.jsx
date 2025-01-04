import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const ActionButton = ({
    onImport,
    onSyncSelected,
    onDeleteSelected,
    onSyncAll,
    onDeleteAll,
    selectedAccounts,
    onExport,
}) => {
    return (
        <div className='relative inline-block text-left z-30'>
            <Menu as='div' className='relative inline-block text-left'>
                <div>
                    <MenuButton className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-900'>
                        Action
                        <ChevronDownIcon
                            aria-hidden='true'
                            className='w-5 h-5 text-gray-400'
                        />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-blue-600 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                    <div className='py-1'>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onImport}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Import
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onExport}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Export
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onSyncSelected}
                                    disabled={selectedAccounts.length === 0}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } ${
                                        selectedAccounts.length === 0
                                            ? 'text-neutral-400 cursor-not-allowed'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Sync Selected
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onDeleteSelected}
                                    disabled={selectedAccounts.length === 0}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } ${
                                        selectedAccounts.length === 0
                                            ? 'text-neutral-400 cursor-not-allowed'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Delete Selected
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onSyncAll}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Sync All
                                </button>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ active }) => (
                                <button
                                    onClick={onDeleteAll}
                                    className={`${
                                        active
                                            ? 'bg-blue-400 text-gray-200'
                                            : 'text-neutral-200'
                                    } block w-full text-left px-4 py-2 text-sm`}
                                >
                                    Delete All
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </div>
    );
};

export default ActionButton;
