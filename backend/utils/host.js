const getHost = (domain) => {
    switch (domain) {
        case 'yahoo.com':
            return 'imap.mail.yahoo.com';
        case 'hotmail.com':
        case 'outlook.com':
            return 'imap-mail.outlook.com';
        case 'gmail.com':
            return 'imap.gmail.com';
        case 'icloud.com':
            return 'imap.mail.me.com';
        default:
            throw new Error(`Unsupported email domain: ${domain}`);
    }
};

module.exports = { getHost };
