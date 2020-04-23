import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TablePagin from './TablePagin';

import './_table.scss';

class TableRow extends Component {
    render() {
        const {
            rowData = {},
            columns = []
        } = this.props || {}

        return (
            <tr>
                {
                    columns.map((column, index) => {
                        const {
                            key,
                            customCell
                        } = column || {};
                        const cellData = customCell ? customCell(rowData) : rowData[key];

                        return <td className="py-2" key={index}>
                            {cellData}
                        </td>
                    })
                }
            </tr>
        )
    }
}


class StripedTable extends Component {
    render() {
        const {
            tableHeaders = [],
            tableColumns = [],
            bodyData = [],
            noPagination = false,
            footerData = [],
            handleChangeItemsPerPage = () => { },
            handleChangeActivedPage = () => { },
            handleNextOrPreviousPage = () => { }
        } = this.props || {}
        return (
            <>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {
                                    tableHeaders.map((tableHeader, index) => {
                                        return (<th key={index}>
                                            {tableHeader}
                                        </th>)
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bodyData && bodyData.length ? bodyData.map((row, index) => <TableRow
                                    key={index}
                                    rowData={row}
                                    columns={tableColumns}
                                />)
                                    : <tr>
                                        <td colSpan={tableHeaders.length}>
                                            <p className="no-data">Nothing to show</p>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
                {
                    !noPagination && <TablePagin
                        paginData={footerData}
                        handleChangeItemsPerPage={handleChangeItemsPerPage}
                        handleChangeActivedPage={handleChangeActivedPage}
                        handleNextOrPreviousPage={handleNextOrPreviousPage}
                    />
                }
            </>
        )
    }
}

StripedTable.propTypes = {
    bodyData: PropTypes.array.isRequired,
    tableHeaders: PropTypes.array.isRequired,
    tableColumns: PropTypes.array.isRequired,
    footerData: PropTypes.object.isRequired,
    noPagination: PropTypes.bool,
    handleChangeItemsPerPage: PropTypes.func,
    handleChangeActivedPage: PropTypes.func,
    handleNextOrPreviousPage: PropTypes.func
}

export default StripedTable;