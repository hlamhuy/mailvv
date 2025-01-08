import React from 'react';

const ActionMessage = ({ message }) => {
    return (
        <div className={`ml-2 text-sm font-bold ${message.color}`}>
            {message.text}
        </div>
    );
};

export default ActionMessage;
