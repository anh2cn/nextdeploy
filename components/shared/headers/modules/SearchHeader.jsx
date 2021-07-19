import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Spin } from 'antd';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import axios from 'axios'
const exampleCategories = [
 
];

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [total, settotal] = useState("")

    const getRecords = async()=> {
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/search?q=${keyword}`);
        console.log(res.data)
        setResultItems(res.data.produits)
        // setcurrentpage(res.data.currentPage)
        settotal(res.data.totalItems)
        setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
    };
    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        Router.push(`/search?keyword=${keyword}`);
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    _limit: 5,
                    title_contains: keyword,
                };
                getRecords();
            
                    setLoading(false);
                   
                    setIsSearch(true);
              
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (total && total > 0) {
            if (total > 2) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href={`/search?keyword=${keyword}`}>
                            <a>See all results</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems?.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>No product found.</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }

    selectOptionView = exampleCategories.map((option) => (
        <option value={option} key={option}>
            {option}
        </option>
    ));

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}>
            <div className="ps-form__categories">
                <select className="form-control">{selectOptionView}</select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder="I'm shopping for..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit}>Search</button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}>
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
