const MailContainer = ({ id, sender, subject, count, date }) => {
    return (
        <div className={`mail-container-${id} text-xs`}>
            <div className='mail-sender'>{sender}</div>
            <div className='mail-subject'>{subject}</div>
            <div className='mail-count'>{count}</div>
            <div className='mail-date'>{date}</div>
        </div>
    );
};

export default MailContainer;
