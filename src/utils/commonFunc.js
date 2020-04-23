import React from 'react';
import { en } from './../constants/lang/en';

const isRequired = (value) => {
    return (value && value.trim().length);
}

const isValidEmail = (email) => {
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return filter.test(email)
}

export const isValidRequest = (valid) => {
    if (!valid) return false;
    for (const key in valid) {
        if (!valid[key]) return false;
    }
    return true;
}

export const validateFunc = {
    isRequired,
    isValidEmail
}

export const getLanguageKey = (messageKeyString) => {
    if (!messageKeyString || !messageKeyString.length) return null;
    const messageKeys = messageKeyString.split('.');
    const messageText = messageKeys.reduce((message, messageKey) => {
        return message[messageKey] || '';
    }, en)

    const message = <>{messageText}</>;

    const format = (...contents) => {
        const filter = /({[1-9]+})/g;
        const contentMatches = messageText.match(filter);
        if (!contentMatches || !contentMatches.length) return message;

        const formatedMessage = contentMatches.reduce((reduceMessage, contentMatch) => {
            const replacePosition = parseInt(contentMatch.replace(/[{}]/g, ''))

            return reduceMessage.replace(contentMatch, contents[replacePosition - 1])
        }, messageText)

        return formatedMessage;
    }

    return {
        ...message,
        label: messageText,
        format
    }
}