import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getLanguageKey } from './../../utils/commonFunc';

import './_tablePagin.scss';

class PageNav extends Component {
    render() {
        const {
            page = 0,
            totalPage = 0,
            handleNextOrPreviousPage
        } = this.props || {};

        const numberOfPageButton = totalPage > 5 ? 5 : totalPage;
        const endPage = page + 2 > totalPage
            ? totalPage
            : page + 2 > numberOfPageButton ?
                page + 2
                : numberOfPageButton;
        const startPage = endPage - numberOfPageButton < 0 ? 0 : endPage - numberOfPageButton;

        return (<div className="pagination__page-nav">
            <button
                className="pagination__page-nav--controlled-button"
                onClick={() => handleNextOrPreviousPage('first')}
                disabled={page === 0}
            >
                <i className="ti-angle-double-left"></i>
            </button>

            <button
                className="pagination__page-nav--controlled-button"
                onClick={() => handleNextOrPreviousPage('prev')}
                disabled={page === 0}
            >
                <i className="ti-angle-left"></i>
            </button>
            {
                Array.from({ length: endPage - startPage }, (btn, index) => {
                    const pageNumber = index + startPage;
                    return <button
                        key={index}
                        className={`pagination__page-nav--controlled-button pagination__page-nav--controlled-number ${page === pageNumber ? 'btn-actived' : ''}`}
                        disabled={page === pageNumber}
                        onClick={() => handleNextOrPreviousPage(pageNumber)}
                    >
                        {pageNumber + 1}
                    </button>
                })
            }
            <button
                className="pagination__page-nav--controlled-button"
                onClick={() => handleNextOrPreviousPage('next')}
                disabled={page === totalPage - 1}
            >
                <i className="ti-angle-right"></i>
            </button>
            <button
                className="pagination__page-nav--controlled-button"
                onClick={() => handleNextOrPreviousPage('last')}
                disabled={page === totalPage - 1}
            >
                <i className="ti-angle-double-right"></i>
            </button>
        </div>)
    }
}

class TablePagin extends Component {
    render() {
        const {
            paginData = {},
            handleChangeItemsPerPage = () => { },
            handleChangeActivedPage = () => { },
            handleNextOrPreviousPage = () => { }
        } = this.props || {};
        const {
            limit = 10,
            page = 0,
            total = 0
        } = paginData;

        const totalPage = Math.ceil(total / limit);
        const itemsRange = `${page * limit + 1} - ${page * limit + limit}`

        return (
            <div className="pagination">
                <div className="pagination__select">
                    <span>{getLanguageKey('table.itemsPerPage')}</span>
                    <select
                        name="itemsPerPage"
                        id="itemsPerPage"
                        className="pagination__items-per-page"
                        value={limit}
                        onChange={handleChangeItemsPerPage}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                    <span className="ml-2">{getLanguageKey('table.page')}</span>
                    <select
                        name="activedPage"
                        id="activedPage"
                        className="pagination__actived-page"
                        value={page}
                        onChange={handleChangeActivedPage}
                    >
                        {
                            Array.from({ length: totalPage }, (page, index) => <option key={index} value={index}>{index + 1}</option>)
                        }
                    </select>
                    <span>{getLanguageKey('table.of')} {totalPage}</span>
                </div>
                <div className="pagination__controller">
                    <span>{getLanguageKey('table.itemsShown').format(itemsRange, total)}</span>
                    <PageNav
                        limit={limit}
                        page={page}
                        total={total}
                        totalPage={totalPage}
                        handleNextOrPreviousPage={handleNextOrPreviousPage}
                    />
                </div>
            </div>
        )
    }
}

TablePagin.propTypes = {
    paginData: PropTypes.object.isRequired
}

export default TablePagin