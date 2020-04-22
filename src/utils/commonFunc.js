import { en } from './../constants/lang/en';

const isRequired = (value) => {
    return (value && value.trim().length);
}

const isValidEmail = (email) => {
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email)
}

export const validateFunc = {
    isRequired,
    isValidEmail
}

export const getLanguageKey = (messageKeyString) => {
    if (!messageKeyString || !messageKeyString.length) return null;
    const messageKeys = messageKeyString.split('.');
    return messageKeys.reduce((message, messageKey) => {
        return message[messageKey] || '';
    }, en)
}