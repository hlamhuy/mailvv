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
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSyncingComplete, setIsSyncingComplete] = useState(false);
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
            setIsSyncingComplete(false);
            setSelectedAccounts((prevSelected) => [
                ...prevSelected,
                ...currentAccounts
                    .map((account) => account.id)
                    .filter((id) => !prevSelected.includes(id)),
            ]);
        } else {
            setSelectedAccounts((prevSelected) =>
                prevSelected.filter(
                    (id) =>
                        !currentAccounts
                            .map((account) => account.id)
                            .includes(id)
                )
            );
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
            setIsSyncingComplete(false);
            setSelectedAccounts((prevSelected) => [...prevSelected, accountId]);
        } else {
            setSelectedAccounts((prevSelected) =>
                prevSelected.filter((id) => id !== accountId)
            );
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
        console.log(
            'Duplicate entries: ',
            newAccounts.length - accountsToAdd.length
        );
        accountService
            .addAccount(accountsToAdd)
            .then(() => {
                setAccounts((existingAccounts) => [
                    ...existingAccounts,
                    ...newAccounts,
                ]);
            })
            .catch((error) => {
                console.error('There was an error adding the accounts!', error);
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
    };

    const getDomain = (email) => {
        const domain = email.split('@')[1];
        return domain;
    };

    const handleSyncSelected = () => {
        setIsSyncing(true);
        setIsSyncingComplete(false);
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
            })
            .catch((error) => {
                console.error(
                    'There was an error syncing the accounts!',
                    error
                );
            })
            .finally(() => {
                setIsSyncing(false);
                setIsSyncingComplete(true);
            });
    };

    const handleSyncAll = () => {
        setIsSyncing(true);
        setIsSyncingComplete(false);
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
            })
            .catch((error) => {
                console.error(
                    'There was an error syncing the accounts!',
                    error
                );
            })
            .finally(() => {
                setIsSyncing(false);
                setIsSyncingComplete(true);
            });
    };

    const handleDeleteSelected = () => {
        accountService
            .removeAccounts(selectedAccounts)
            .then(() => {
                setAccounts((existingAccounts) =>
                    existingAccounts.filter(
                        (existingAccount) =>
                            !selectedAccounts.includes(existingAccount.id)
                    )
                );
                setSelectedAccounts([]); // Clear selected accounts
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
            });
    };

    const handleDeleteDead = () => {
        const deadAccounts = accounts.filter(
            (account) => account.alive === false
        );

        if (deadAccounts.length === 0) {
            console.log('Found 0 dead accounts');
            return;
        }

        const deadAccountIds = deadAccounts.map((account) => account.id);
        accountService
            .removeAccounts(deadAccountIds)
            .then(() => {
                setAccounts((existingAccounts) =>
                    existingAccounts.filter(
                        (existingAccount) =>
                            !deadAccounts.some(
                                (deadAccount) =>
                                    deadAccount.id === existingAccount.id
                            )
                    )
                );
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
            });
    };

    const handleDeleteAll = () => {
        accountService
            .removeAllAccounts()
            .then(() => {
                setAccounts([]);
            })
            .catch((error) => {
                console.error(
                    'There was an error deleting the accounts!',
                    error
                );
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
                isSyncing={isSyncing}
                isSyncingComplete={isSyncingComplete}
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
