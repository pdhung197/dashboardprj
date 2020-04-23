import React, { Component } from 'react';

import { getUserList } from './../../actions/dataActions';
import { getLanguageKey } from './../../utils/commonFunc';

import { columns } from './TableHeader';

import StripedTable from './../../components/Tables/StripedTable';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            footerData: {
                page: 0,
                limit: 5,
                total: 0
            },
            list: []
        }
    }

    componentDidMount() {
        this.fetchUserList();
    }

    fetchUserList = () => {
        const {
            footerData,
            footerData: {
                page = 0,
                limit = 10
            }
        } = this.state || {};

        getUserList()
            .then(response => {
                const { data } = response || {};
                if (!data || data === '') return;

                this.setState({
                    footerData: {
                        ...footerData,
                        total: data.length
                    },
                    list: data.slice(page * limit, page * limit + limit)
                })
            })
            .catch(error =>
                console.log({ error })
            )
    }

    getTableHeaders = () => {
        return (columns || []).reduce((TableHeaders, column) => {
            const {
                key,
                label,
                show = true
            } = column;

            if (show) {
                TableHeaders.push(<span key={key}>{getLanguageKey(label)}</span>)
            }
            return TableHeaders;
        }, []);
    }

    getTableColumns = () => {
        return (columns || []).reduce((tableColumns, column) => {
            const tableColumn = { ...column };
            switch (tableColumn.key) {
                case 'email':
                    tableColumn.customCell = (user) => <a href={`mailto:${user.email}`}>{user.email}</a>
                    break;
                case 'phone':
                    tableColumn.customCell = (user) => <a href={`tel:${user.phone}`}>{user.phone}</a>
                    break;
                case 'avatar':
                    tableColumn.customCell = (user) => <img src={user.avatar} alt="avatar" />
                    break;
                default:
                    break;
            }
            tableColumns.push(tableColumn);
            return tableColumns;
        }, []);
    }

    handleChangeItemsPerPage = (e) => {
        const { value = 5 } = e.target || {};

        if (parseInt(value) !== this.state.footerData.limit) {
            this.setState({
                footerData: {
                    ...this.state.footerData,
                    page: 0,
                    limit: parseInt(value)
                }
            }, () => this.fetchUserList());
        }
    }

    handleChangeActivedPage = (e) => {
        const { value = 0 } = e.target || {};

        if (parseInt(value) !== this.state.footerData.page) {
            this.setState({
                footerData: {
                    ...this.state.footerData,
                    page: parseInt(value)
                }
            }, () => this.fetchUserList());
        }
    }

    handleNextOrPreviousPage = (key) => {
        const {
            limit = 10,
            page = 0,
            total = 0
        } = this.state.footerData;

        const totalPage = Math.ceil(total / limit);

        let pageNumber = 0;
        switch (key) {
            case 'next':
                pageNumber = page + 1 > totalPage - 1 ? totalPage - 1 : page + 1;
                break;
            case 'prev':
                pageNumber = page - 1 < 0 ? 0 : page - 1;
                break;
            case 'first':
                pageNumber = 0;
                break;
            case 'last':
                pageNumber = totalPage - 1;
                break;
            default:
                pageNumber = key;
                break;
        }

        if (parseInt(pageNumber) !== page) {
            this.setState({
                footerData: {
                    ...this.state.footerData,
                    page: parseInt(pageNumber)
                }
            }, () => this.fetchUserList());
        }
    }

    render() {
        const {
            list,
            footerData
        } = this.state;

        return (
            <StripedTable
                bodyData={list}
                tableHeaders={this.getTableHeaders()}
                tableColumns={this.getTableColumns()}
                footerData={footerData}
                handleChangeItemsPerPage={this.handleChangeItemsPerPage}
                handleChangeActivedPage={this.handleChangeActivedPage}
                handleNextOrPreviousPage={this.handleNextOrPreviousPage}
            />
        )
    }
}
