import React from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [inputValue, setInputValue] = React.useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-screen lg:w-[55vw] max-w-[1250px]'>
                <form className='bg-slate-700 py-8 px-12 rounded-md'>
                    <h2 className='text-xl mb-4'>Import Accounts</h2>
                    <textarea
                        className='w-full h-40 p-2 border border-gray-300 rounded-md text-black'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder='email:password'
                    />
                    <div className='mt-4 flex justify-end space-x-2'>
                        <button className='btn bg-gray-500' onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            className='btn bg-blue-500'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
