import React, { useEffect, useState } from 'react';
import accountService from '../../services/accounts';
import ImportModal from './ImportModal';
import ActionBar from './ActionBar';
import ConfigTable from './ConfigTable';
import ExportModal from './ExportModal';

const Config = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [actionMessage, setActionMessage] = useState({ text: '', color: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        accountService
            .getAllAccounts()
            .then((accounts) => {
                setAccounts(accounts);
                setFilteredAccounts(accounts);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the accounts!',
                    error
                );
            });
    }, []);

    const handleSelectAll = (event) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentAccounts = accounts.slice(startIndex, endIndex);

        if (event.target.checked) {
            setSelectedAccounts((prevSelected) => {
                const newSelected = [
                    ...prevSelected,
                    ...currentAccounts
                        .map((account) => account.id)
                        .filter((id) => !prevSelected.includes(id)),
                ];
                setActionMessage({
                    text: `Selecting ${newSelected.length} account(s)`,
                    color: 'text-gray-300',
                });
                return newSelected;
            });
        } else {
            setSelectedAccounts((prevSelected) => {
                const newSelected = prevSelected.filter(
                    (id) =>
                        !currentAccounts
                            .map((account) => account.id)
                            .includes(id)
                );
                setActionMessage({
                    text: `Selecting ${newSelected.length} account(s)`,
                    color: 'text-gray-300',
                });
                return newSelected;
            });
        }
    };

    const handleSearch = (query) => {
        const filtered = accounts.filter((account) =>
            account.user.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredAccounts(filtered);
    };

    const handleSelectAccount = (event, accountId) => {
        if (event.target.checked) {
            setSelectedAccounts((prevSelected) => {
                const newSelected = [...prevSelected, accountId];
                setActionMessage({
                    text: `Selecting ${newSelected.length} account(s)`,
                    color: 'text-gray-300',
                });
                return newSelected;
            });
        } else {
            setSelectedAccounts((prevSelected) => {
                const newSelected = prevSelected.filter(
                    (id) => id !== accountId
                );
                setActionMessage({
                    text: `Selecting ${newSelected.length} account(s)`,
                    color: 'text-gray-300',
                });
                return newSelected;
            });
        }
    };

    const handleImport = (input) => {
        const newAccounts = input.split('\n').map((line) => {
            const [user, pass] = line.split(':');
            const sanitizedPass = pass.replace(/[\s-]/g, '');
            return {
                user,
                pass: sanitizedPass,
                domain: getDomain(user),
                alive: null,
                last_synced: null,
            };
        });

        const accountsToAdd = newAccounts.filter(
            (newAccount) =>
                !accounts.some((account) => account.user === newAccount.user)
        );

        accountService
            .addAccount(accountsToAdd)
            .then(() => {
                setAccounts((existingAccounts) => [
                    ...existingAccounts,
                    ...newAccounts,
                ]);
                setActionMessage({
                    text: `${accountsToAdd.length} account(s) imported successfully`,
                    color: 'text-green-300',
                });
            })
            .catch((error) => {
                console.error('There was an error adding the accounts!', error);
                setActionMessage({
                    text: 'ERROR ADDING ACCOUNT!! Please ensure you have correct account format then try again.',
                    color: 'text-red-500',
                });
            });
    };

    const handleExport = (type) => {
        let accountsToExport;
        switch (type) {
            case 'selected':
                accountsToExport = accounts.filter((account) =>
                    selectedAccounts.includes(account.id)
                );
                break;
            case 'all':
                accountsToExport = accounts;
                break;
            case 'alive':
                accountsToExport = accounts.filter((account) => account.alive);
                break;
            default:
                return;
        }

        const exportData = accountsToExport
            .map((account) => `${account.user}:${account.pass}`)
            .join('\n');

        const blob = new Blob([exportData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'accounts.txt';
        a.click();
        URL.revokeObjectURL(url);
        setActionMessage({
            text: `${accountsToExport.length} account(s) exported successfully'`,
            color: 'text-green-500',
        });
    };

    const getDomain = (email) => {
        const domain = email.split('@')[1];
        return domain;
    };

    const handleSyncSelected = () => {
        setActionMessage({
            text: `Syncing ${selectedAccounts.length} account(s)...`,
            color: 'text-yellow-400',
        });
        const syncPromises = selectedAccounts.map((accountId) =>
            accountService.syncAccount(accountId)
        );

        Promise.all(syncPromises)
            .then((updatedAccounts) => {
                setAccounts((existingAccounts) =>
                    existingAccounts.map(
                        (existingAccount) =>
                            updatedAccounts.find(
                                (updatedAccount) =>
                                    updatedAccount.id === existingAccount.id
                            ) || existingAccount
                    )
                );
                setFilteredAccounts((existingAccounts) =>
                    existingAccounts.map(
                        (existingAccount) =>
                            updatedAccounts.find(
                                (updatedAccount) =>
                                    updatedAccount.id === existingAccount.id
                            ) || existingAccount
                    )
                );
                setActionMessage({
                    text: `Complete syncing ${selectedAccounts.length} account(s)!!`,
                    color: 'text-green-500',
                });
            })
            .catch((error) => {
                console.error(
                    'There was an error syncing the account(s)!',
                    error
                );
                setActionMessage({
                    text: 'ERROR SYNCING ACCOUNT!!',
                    color: 'text-red-500',
                });
            });
    };

    const handleSyncAll = () => {
        setActionMessage({
            text: `Syncing ${accounts.length} account(s). May take a while...`,
            color: 'text-yellow-400',
        });

        const syncPromises = accounts.map((account) =>
            accountService.syncAccount(account.id)
        );

        Promise.all(syncPromises)
            .then((updatedAccounts) => {
                setAccounts((existingAccounts) =>
                    existingAccounts.map(
                        (existingAccount) =>
                            updatedAccounts.find(
                                (updatedAccount) =>
                                    updatedAccount.id === existingAccount.id
                            ) || existingAccount
                    )
                );
                setFilteredAccounts((existingAccounts) =>
                    existingAccounts.map(
                        (existingAccount) =>
                            updatedAccounts.find(
                                (updatedAccount) =>
                                    updatedAccount.id === existingAccount.id
                            ) || existingAccount
                    )
                );
                setActionMessage({
                    text: 'Complete syncing all accounts!!',
                    color: 'text-green-500',
                });
            })
            .catch((error) => {
                console.error(
                    'There was an error syncing the account(s)!',
                    error
                );
                setActionMessage({
                    text: 'ERROR SYNCING ACCOUNT!!',
                    color: 'text-red-500',
                });
            });
    };

    const handleDeleteSelected = () => {
        accountService
            .removeAccounts(selectedAccounts)
            .then(() => {
                const updatedAccounts = accounts.filter(
                    (account) => !selectedAccounts.includes(account.id)
                );
                setAccounts(updatedAccounts);
                setFilteredAccounts(updatedAccounts);
                setSelectedAccounts([]);
                setActionMessage({
                    text: `${selectedAccounts.length} account(s) deleted successfully`,
                    color: 'text-green-500',
                });
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the account(s)!',
                    error
                );
                setActionMessage({
                    text: 'ERROR DELETING ACCOUNT!!',
                    color: 'text-red-500',
                });
            });
    };

    const handleDeleteDead = () => {
        const deadAccounts = accounts.filter((account) => account.alive === 0);

        if (deadAccounts.length === 0) {
            setActionMessage({ text: 'No bad accounts found!', color: 'gray' });
            return;
        }

        const deadAccountIds = deadAccounts.map((account) => account.id);
        accountService
            .removeAccounts(deadAccountIds)
            .then(() => {
                const updatedAccounts = accounts.filter(
                    (account) => !deadAccountIds.includes(account.id)
                );
                setAccounts(updatedAccounts);
                setFilteredAccounts(updatedAccounts);
                setActionMessage({
                    text: `${deadAccounts.length} account(s) deleted successfully`,
                    color: 'text-green-500',
                });
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
                setActionMessage({
                    text: 'ERROR DELETING ACCOUNT!!',
                    color: 'text-red-500',
                });
            });
    };

    const handleDeleteAll = () => {
        accountService
            .removeAllAccounts()
            .then(() => {
                setAccounts([]);
                setFilteredAccounts([]);
                setActionMessage({
                    text: 'All accounts deleted successfully',
                    color: 'text-green-500',
                });
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
                setActionMessage({
                    text: 'ERROR DELETING ACCOUNT!!',
                    color: 'text-red-500',
                });
            });
    };

    return (
        <div className='px-60 py-10'>
            <ActionBar
                onImport={() => setIsImportModalOpen(true)}
                onExport={() => setIsExportModalOpen(true)}
                onSearch={handleSearch}
                onSyncAll={handleSyncAll}
                onDeleteAll={handleDeleteAll}
                onSyncSelected={handleSyncSelected}
                onDeleteSelected={handleDeleteSelected}
                onDeleteDead={handleDeleteDead}
                selectedAccounts={selectedAccounts}
                message={actionMessage}
            />

            <ConfigTable
                accounts={filteredAccounts}
                selectedAccounts={selectedAccounts}
                setSelectedAccounts={setSelectedAccounts}
                handleSelectAll={handleSelectAll}
                handleSelectAccount={handleSelectAccount}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
            />

            <ImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onSubmit={handleImport}
            />

            <ExportModal
                isOpen={isExportModalOpen}
                onClose={() => setIsExportModalOpen(false)}
                onSubmit={handleExport}
            />
        </div>
    );
};

export default Config;
