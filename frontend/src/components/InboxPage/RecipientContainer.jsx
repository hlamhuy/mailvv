const RecipientContainer = ({ recipients, handleRecipientClick }) => {
    return (
        <div className='custom-scrollbar w-2/12 h-full'>
            {recipients.map((recipient, index) => (
                <div
                    key={index}
                    className='p-1 pl-4 border-b-1 border-gray-600 text-xs hover:bg-neutral-700'
                    onClick={() =>
                        handleRecipientClick(
                            recipient.uid,
                            recipient.account_id
                        )
                    }
                >
                    {recipient.recipient}
                </div>
            ))}
        </div>
    );
};

export default RecipientContainer;