import React, { useEffect, useState } from 'react';
import ContainerPage from '~/components/layouts/ContainerPage';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductRepository from '~/repositories/ProductRepository.js';
import Product from '~/components/elements/products/Product';
import ProductGroupGridItems from '~/components/partials/product/ProductGroupGridItems';
import axios from 'axios'
import { Pagination } from 'antd';

const SearchPage = ({ query }) => {
    const [pageSize] = useState("10");
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState(null);
    const [total, settotal] = useState('')
    const [currentpage, setcurrentpage] = useState("5")
    const [pageSizee, setpageSize] = useState("10")
    function handleSetKeyword() {
        if (query && query.keyword !== '') {
            setKeyword(query.keyword);
        } else {
            setKeyword('');
        }
    }
    const GetArticles = async()=> {
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/search?q=${query.keyword}&page=${currentpage}&size=${pageSizee}`);
        setProductItems(res.data.produits)
        setcurrentpage(res.data.currentPage)

        settotal(res.data.totalItems)
        setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
    };
    async function getProductsByKeyword(keyword) {
        handleSetKeyword();
        const queries = {
            _limit: pageSize,
            title_contains: keyword,
        };
        setLoading(true);
        GetArticles()
        // if (productItems) {
        //     if (total> 0) {
        //         setProductItems(productItems);
        //     } else {
        //         setProductItems(null);
        //     }

        //     setTimeout(function () {
        //         setLoading(false);
        //     }, 500);

        //     return productItems;
        // } else {
        //     setProductItems(null);
        //     return null;
        // }
    }

    useEffect(() => {
        getProductsByKeyword(query.keyword)
        // console.log(keyword)
    
    }, [query,currentpage,pageSizee]);
    const paginate = (currentpage, pageSizee) => {
        setcurrentpage(currentpage);
        setpageSize(pageSizee)
    };
    const breadcrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Search Result',
        },
    ];

    let shopItemsView, statusView;
    if (!loading) {
        if (productItems) {
            shopItemsView = (
                <ProductGroupGridItems columns={6} pageSize={5} />
            );
            if (total > 0) {
                const items = productItems?.map((item) => {
                    return (
                        
                        <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />
                            
                        </div>
                    );
                });
                
                shopItemsView = (
                    <div className="ps-product-items row">{items}</div>
                );
                statusView = (
                    <p>
                        <strong style={{ color: '#000' }}>
                            {total}
                        </strong>{' '}
                        record(s) found.
                    </p>
                );
            } else {
                shopItemsView = <p>No product(s) found.</p>;
            }
        } else {
            shopItemsView = <p>No product(s) found.</p>;
        }
    } else {
        statusView = <p>Searching...</p>;
    }

    return (
        <ContainerPage title={`Search results for: "${keyword}" `} boxed={true}>
            <div className="ps-page">
                <BreadCrumb breacrumb={breadcrumb} />
            </div>
            <div className="container">
                <div className="ps-shop ps-shop--search">
                    <div className="container">
                        <div className="ps-shop__header">
                            <h1>
                                Search result for: "<strong>{keyword}</strong>"
                            </h1>
                        </div>
                        <div className="ps-shop__content">
                            {statusView}
                            {shopItemsView}
                            
                            {productItems?.map((item) => {

                    <div className="col-md-3 col-sm-6 col-6" key={item.id}>
                            <Product product={item} />

                             </div>

                            })}
                 
                 <div className="ps-shopping__footer text-center">
                <div className="ps-pagination">
                    <Pagination
                        total={total }
                        responsive={true}
                        pageSize={pageSizee}
                        showTotal={total => `Total ${total} items`}

                        current={currentpage}
                        onChange={paginate
                          }
                    />
                </div>
            </div>   
                        </div>
                    </div>
                </div>
           
            </div>

        </ContainerPage>
    );
};

SearchPage.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default SearchPage;
