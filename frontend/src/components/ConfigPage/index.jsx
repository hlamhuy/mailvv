import React, { useEffect, useState } from 'react';
import accountService from '../../services/accounts';
import Modal from './ImportModal';
import ActionBar from './ActionBar';
import ConfigTable from './ConfigTable';

const Config = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        accountService
            .getAllAccounts()
            .then((accounts) => {
                setAccounts(accounts);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the accounts!',
                    error
                );
            });
    }, []);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedAccounts(accounts.map((account) => account.id));
        } else {
            setSelectedAccounts([]);
        }
    };

    const handleSelectAccount = (event, accountId) => {
        if (event.target.checked) {
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

        accountService
            .addAccount(newAccounts)
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

    const getDomain = (email) => {
        const domain = email.split('@')[1];
        return domain;
    };

    const handleSyncSelected = () => {
        selectedAccounts.forEach((accountId) => {
            accountService
                .syncAccount(accountId)
                .then((updatedAccount) => {
                    setAccounts((existingAccounts) =>
                        existingAccounts.map((existingAccount) =>
                            existingAccount.id === updatedAccount.id
                                ? updatedAccount
                                : existingAccount
                        )
                    );
                })
                .catch((error) => {
                    console.error(
                        'There was an error syncing the account!',
                        error
                    );
                });
        });
    };

    const handleDeleteSelected = () => {
        const deletePromises = selectedAccounts.map((accountId) =>
            accountService.removeAccount(accountId)
        );

        Promise.all(deletePromises)
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

    const handleSyncAll = () => {
        // Sync all accounts one by one
        accounts.forEach((account) => {
            accountService
                .syncAccount(account.id)
                .then((updatedAccount) => {
                    setAccounts((existingAccounts) =>
                        existingAccounts.map((existingAccount) =>
                            existingAccount.id === updatedAccount.id
                                ? updatedAccount
                                : existingAccount
                        )
                    );
                })
                .catch((error) => {
                    console.error(
                        'There was an error syncing the account!',
                        error
                    );
                });
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
                onImport={() => setIsModalOpen(true)}
                onSyncAll={handleSyncAll}
                onDeleteAll={handleDeleteAll}
                onSyncSelected={handleSyncSelected}
                onDeleteSelected={handleDeleteSelected}
                selectedAccounts={selectedAccounts}
            />

            <ConfigTable
                accounts={accounts}
                selectedAccounts={selectedAccounts}
                handleSelectAll={handleSelectAll}
                handleSelectAccount={handleSelectAccount}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleImport}
            />
        </div>
    );
};

export default Config;
