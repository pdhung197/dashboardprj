import React, { Component } from 'react'

export default class InputForm extends Component {
    render() {
        const {
            disabled = false,
            className = '',
            value,
            id,
            name,
            placeholder = '',
            type = 'text',
            checked = false,
            autoFocus,
            onChange = () => { }
        } = this.props || {};

        const inputProps = {
            value,
            placeholder,
            type,
            onChange,
            disabled,
            className,
            autoFocus
        }

        if (id) inputProps.id = id;

        if (name) inputProps.name = name;

        if (type === 'checkbox' || type === 'radio') inputProps.checked = checked;

        return (
            <input
                {...inputProps}
            />
        )
    }
}
