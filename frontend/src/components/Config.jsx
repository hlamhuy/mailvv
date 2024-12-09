import React from 'react';

const Config = () => {
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
                    <button className='btn bg-green-500'>Import</button>
                    <button className='btn bg-purple-600'>Sync</button>
                </div>
            </div>
            <div className='py-6 table w-full'>
                <table className='mt-4 min-w-full border-separate border-spacing-0 divide-y'>
                    <thead>
                        <tr>
                            <th className='text-left'>Email</th>
                            <th className='text-left'>Status</th>
                            <th className='text-left'>Last Sync</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default Config;
