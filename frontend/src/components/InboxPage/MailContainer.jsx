const MailContainer = ({ id, sender, subject, amount, date }) => {
    return (
        <div className={`mail-container-${id} text-xs text-yellow-50`}>
            <div className='font-bold'>({amount}) {subject}</div>
            <div className='mail-sender'>{sender}</div>
            <div className='mail-date text-xs'>{date}</div>
        </div>
    );
};

export default MailContainer;
