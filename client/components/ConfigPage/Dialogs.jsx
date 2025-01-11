import React from 'react';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from '@headlessui/react';

const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmText,
    icon,
}) => {
    return (
        <Dialog open={open} onClose={onClose} className='relative z-10'>
            <DialogBackdrop
                transition
                className='fixed inset-0 bg-neutral-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
            />

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                    <DialogPanel
                        transition
                        className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
                    >
                        <div className='bg-slate-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div
                                    className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full ${
                                        confirmText === 'Delete'
                                            ? 'bg-red-200'
                                            : 'bg-blue-200'
                                    } sm:mx-0 sm:size-10`}
                                >
                                    {icon}
                                </div>
                                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                    <DialogTitle
                                        as='h3'
                                        className='text-base font-semibold text-gray-50'
                                    >
                                        {title}
                                    </DialogTitle>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-300'>
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-slate-600 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                                type='button'
                                data-autofocus
                                onClick={onClose}
                                className='btn text-white bg-gray-400 hover:bg-gray-500'
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                onClick={onConfirm}
                                className={`btn text-gray-100 ${
                                    confirmText === 'Delete'
                                        ? 'bg-red-700 hover:bg-red-800'
                                        : 'bg-blue-700 hover:bg-blue-800'
                                }  mr-2`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default ConfirmationDialog;
