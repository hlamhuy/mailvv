import React from 'react';

const ExportModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    const handleExportSelected = () => {
        onSubmit('selected');
        onClose();
    };

    const handleExportAll = () => {
        onSubmit('all');
        onClose();
    };

    const handleExportAlive = () => {
        onSubmit('alive');
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-screen lg:w-[55vw] max-w-[1250px]'>
                <div className='bg-slate-700 py-8 px-12 rounded-md'>
                    <h2 className='text-xl mb-4'>Export Accounts</h2>
                    <div className='flex flex-col space-y-4'>
                        <button
                            className='btn bg-blue-500'
                            onClick={handleExportSelected}
                        >
                            Export Selected
                        </button>
                        <button
                            className='btn bg-blue-500'
                            onClick={handleExportAll}
                        >
                            Export All
                        </button>
                        <button
                            className='btn bg-blue-500'
                            onClick={handleExportAlive}
                        >
                            Export Only Alive
                        </button>
                    </div>
                    <div className='mt-4 flex justify-end'>
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