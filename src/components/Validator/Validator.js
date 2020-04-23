import React, { Component } from 'react';
import { validateFunc, getLanguageKey } from './../../utils/commonFunc';

import './_validator.scss';

export default class Validator extends Component {
    componentWillUnmount() {
        const { validationCallback, id } = this.props;
        validationCallback && validationCallback(id, true);
    }

    renderInvalidMessage = (validType = [], value) => {
        const {
            validationCallback,
            id,
            hideMessage,
            disabled
        } = this.props;
        let invalidMessage = null;
        for (const valid of validType) {
            const {
                type,
                message = ''
            } = valid;
            switch (type) {
                case 'isRequired':
                    if (!validateFunc.isRequired(value))
                        invalidMessage = getLanguageKey(message)
                    break;
                case 'isValidEmail': if (!validateFunc.isValidEmail(value))
                    invalidMessage = getLanguageKey(message)
                    break;
                default:
                    break;
            }
            if (invalidMessage) break;
        }
        setTimeout(() => validationCallback && validationCallback(id, !invalidMessage));
        return <p
            className={`validate-text font-italic ${hideMessage || disabled ? 'text-hidden' : ''}`}
        >
            {hideMessage || disabled ? '_' : invalidMessage}
        </p>;
    }

    render() {
        const {
            validType = [],
            value
        } = this.props;

        return this.renderInvalidMessage(validType, value);
    }
}
