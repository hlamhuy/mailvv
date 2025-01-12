import React, { useEffect, useState } from 'react';
import mailService from '../../services/mails';
import MailContainer from './MailContainer';
import RecipientContainer from './RecipientContainer';
import HtmlParser from 'html-react-parser';

const Inbox = () => {
    const [mails, setMails] = useState([]);
    const [recipients, setRecipients] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        mailService
            .getAllMails()
            .then((fetchedMails) => {
                const sortedMails = fetchedMails.sort(
                    (a, b) => b.most_recent - a.most_recent
                );
                setMails(sortedMails);
            })
            .catch((error) => {
                console.error('There was an error fetching the mails!', error);
            });
    }, []);

    const handleMailClick = (mailId) => {
        mailService
            .getMailRecipients(mailId)
            .then((fetchedRecipients) => {
                setRecipients(fetchedRecipients);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the recipients!',
                    error
                );
            });
    };

    const handleRecipientClick = (uid, accountId) => {
        setLoading(true);
        //console.log('Passing: ', uid, accountId);
        mailService
            .getMailContent(uid, accountId)
            .then((fetchedContent) => {
                //console.log('Fetched content: ', fetchedContent);
                setContent(fetchedContent);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    'There was an error fetching the content!',
                    error
                );
            });
    };

    return (
        <div className='block h-[85vh] px-20 py-10'>
            <table className='table-fixed w-full border-2 border-gray-600 '>
                <thead className='bg-blue-900'>
                    <tr>
                        <th className='w-3/12 p-4 border-2 border-gray-600'>
                            Mails
                        </th>
                        <th className='w-2/12 p-4 border-2 border-gray-600'>
                            Recipients
                        </th>
                        <th className='w-7/12 p-4 border-2 border-gray-600'>
                            Content
                        </th>
                    </tr>
                </thead>
            </table>
            <div className='inline-flex w-full h-full bg-neutral-800 border-t-0 border-2 border-gray-600'>
                <MailContainer
                    mails={mails}
                    handleMailClick={handleMailClick}
                />
                <RecipientContainer
                    recipients={recipients}
                    handleRecipientClick={handleRecipientClick}
                />
                <div className='custom-scrollbar w-7/12 h-full'>
                    {loading ? <div>Loading...</div> : HtmlParser(content)}
                </div>
            </div>
        </div>
    );
};

export default Inbox;
