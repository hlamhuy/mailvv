import React, { useState } from 'react';
import { Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const ExportModal = ({ isOpen, onClose, onSubmit }) => {
    const [exportOption, setExportOption] = useState('all');
    if (!isOpen) return null;

    const handleExport = () => {
        onSubmit(exportOption);
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-screen lg:w-[15vw] max-w-[1250px]'>
                <div className='bg-slate-700 py-8 px-12 rounded-md'>
                    <h2 className='text-md mb-4'>
                        Select an option to export accounts
                    </h2>
                    <div className='relative'>
                        <Select
                            name='status'
                            aria-label='Export option'
                            value={exportOption}
                            onChange={(e) => setExportOption(e.target.value)}
                            className='mt-3 block w-full appearance-none rounded-lg border-none bg-slate-500 py-1.5 px-3 text-sm text-white focus:outline-none'
                        >
                            <option value='all'>All Accounts</option>
                            <option value='selected'>Selected Accounts</option>
                            <option value='alive'>Only Alive Accounts</option>
                        </Select>
                        <ChevronDownIcon
                            className='group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60'
                            aria-hidden='true'
                        />
                    </div>

                    <div className='mt-5 flex justify-between'>
                        <button
                            className='btn bg-blue-500'
                            onClick={handleExport}
                        >
                            Save
                        </button>
                        <button className='btn bg-gray-500' onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
