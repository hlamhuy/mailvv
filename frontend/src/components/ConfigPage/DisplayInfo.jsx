import React from 'react';

const DisplayInfo = ({ selectedAccounts, isSyncing, isSyncingComplete }) => {
    return (
        <div
            className={`ml-2 text-sm text-gray-300 font-bold ${
                isSyncingComplete ? 'text-green-400' : ''
            }`}
        >
            {isSyncing
                ? `Syncing ${selectedAccounts.length} accounts...`
                : isSyncingComplete
                ? `Complete syncing ${selectedAccounts.length} accounts!!`
                : selectedAccounts.length > 0
                ? `Selecting ${selectedAccounts.length} account(s)`
                : ''}
        </div>
    );
};

export default DisplayInfo;
