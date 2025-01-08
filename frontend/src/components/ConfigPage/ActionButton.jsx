import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
    ExclamationTriangleIcon,
    ArrowPathIcon,
} from '@heroicons/react/24/outline';
import ConfirmationDialog from './Dialogs';

const ActionButton = ({
    onImport,
    onSyncSelected,
    onDeleteSelected,
    onSyncAll,
    onDeleteAll,
    selectedAccounts,
    onExport,
    onDeleteDead,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});

    const handleDeleteSelected = () => {
        setDialogConfig({
            title: 'Delete Selected Accounts',
            description:
                'Are you sure you want to delete the selected accounts? This action cannot be undone.',
            confirmText: 'Delete',
            icon: <ExclamationTriangleIcon className='size-6 text-red-600' />,
            onConfirm: onDeleteSelected,
        });
        setIsDialogOpen(true);
    };

    const handleDeleteAll = () => {
        setDialogConfig({
            title: 'Delete All Accounts',
            description:
                'Are you sure you want to delete all accounts? This action cannot be undone.',
            confirmText: 'Delete',
            icon: <ExclamationTriangleIcon className='size-6 text-red-600' />,
            onConfirm: onDeleteAll,
        });
        setIsDialogOpen(true);
    };

    const handleDeleteDead = () => {
        setDialogConfig({
            title: 'Delete Bad Accounts',
            description:
                'Are you sure you want to delete all bad accounts? This action cannot be undone.',
            confirmText: 'Delete',
            icon: <ExclamationTriangleIcon className='size-6 text-red-600' />,
            onConfirm: onDeleteDead,
        });
        setIsDialogOpen(true);
    };

    const handleSyncAll = () => {
        setDialogConfig({
            title: 'Sync All Accounts',
            description:
                'Are you sure you want to sync all accounts? This action will update all account data.',
            confirmText: 'Sync',
            icon: <ArrowPathIcon className='size-6 text-blue-600' />,
            onConfirm: onSyncAll,
        });
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        if (dialogConfig.onConfirm) {
            dialogConfig.onConfirm();
        }
        setIsDialogOpen(false);
    };

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
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-400 rounded-md bg-blue-600 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                    <div className='py-1'>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={onImport}
                                className='text-neutral-200 block w-full text-left px-4 py-2 text-sm'
                            >
                                Import
                            </button>
                        </MenuItem>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={onExport}
                                className='text-neutral-200 block w-full text-left px-4 py-2 text-sm'
                            >
                                Export
                            </button>
                        </MenuItem>
                    </div>
                    <div className='py-1'>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={onSyncSelected}
                                disabled={selectedAccounts.length === 0}
                                className={`${
                                    selectedAccounts.length === 0
                                        ? 'text-neutral-400 cursor-not-allowed'
                                        : 'text-neutral-200'
                                } text-neutral-200 block w-full text-left px-4 py-2 text-sm`}
                            >
                                Sync Selected
                            </button>
                        </MenuItem>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={handleSyncAll}
                                className='text-neutral-200 block w-full text-left px-4 py-2 text-sm'
                            >
                                Sync All
                            </button>
                        </MenuItem>
                    </div>
                    <div className='py-1'>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={handleDeleteSelected}
                                disabled={selectedAccounts.length === 0}
                                className={`${
                                    selectedAccounts.length === 0
                                        ? 'text-neutral-400 cursor-not-allowed'
                                        : 'text-neutral-200'
                                } text-neutral-200 block w-full text-left px-4 py-2 text-sm`}
                            >
                                Delete Selected
                            </button>
                        </MenuItem>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={handleDeleteDead}
                                className='text-neutral-200 block w-full text-left px-4 py-2 text-sm'
                            >
                                Delete Bad Accounts
                            </button>
                        </MenuItem>
                        <MenuItem className='hover:bg-blue-400 hover:text-gray-200'>
                            <button
                                onClick={handleDeleteAll}
                                className='text-neutral-200 block w-full text-left px-4 py-2 text-sm'
                            >
                                Delete All
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

            <ConfirmationDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirm}
                title={dialogConfig.title}
                description={dialogConfig.description}
                confirmText={dialogConfig.confirmText}
                icon={dialogConfig.icon}
            />
        </div>
    );
};

export default ActionButton;
