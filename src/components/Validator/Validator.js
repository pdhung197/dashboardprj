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
            hideMessage
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
            className={`validate-text font-italic ${hideMessage ? 'text-hidden' : ''}`}
        >
            {!hideMessage ? invalidMessage : '_'}
        </p>;
    }

    render() {
        const {
            disabled,
            validationCallback,
            id,
            validType = [],
            value
        } = this.props;

        if (!disabled) return this.renderInvalidMessage(validType, value);

        setTimeout(() => validationCallback && validationCallback(id, true))
        return <p
            className="validate-text font-italic text-hidden"
        >
            _
        </p>
    }
}
