import { format as dateFormatter } from 'date-fns';

const MailContainer = ({ mails, handleMailClick }) => {
    return (
        <div className='custom-scrollbar w-3/12 h-full'>
            {mails.map((mail) => (
                <div
                    key={mail.id}
                    className='flex p-4 border-b-2 border-gray-600 hover:bg-neutral-700'
                    onClick={() => handleMailClick(mail.id)}
                >
                    <div
                        className={`mail-container-${mail.id} text-xs text-yellow-50`}
                    >
                        <div className='font-bold'>
                            ({mail.amount}) {mail.subject}
                        </div>
                        <div className='mail-sender'>{mail.sender}</div>
                        <div className='mail-date text-xs'>
                            {formatDate(mail.most_recent)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    const date = new Date(timestamp * 1000);
    return dateFormatter(date, 'MM/dd/yyyy hh:mm:ss a');
};

export default MailContainer;
