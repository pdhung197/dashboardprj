import React, { Component } from 'react'

import { getUserList } from './../../actions/dataActions';

export default class UserList extends Component {
    componentDidMount() {
        this.fetchUserList();
    }

    fetchUserList = () => {
        getUserList()
            .then(response => {
                console.log({ response });
            })
            .catch(error =>
                console.log({ error })
            )
    }

    render() {
        return (
            <div>
                UserList
            </div>
        )
    }
}
