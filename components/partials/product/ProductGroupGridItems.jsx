import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Product from '~/components/elements/products/Product';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import CollectionRepository from '~/repositories/CollectionRepository';
import { generateTempArray } from '~/utilities/common-helpers';
import axios from 'axios'
const ProductGroupGridItems = ({
    collectionSlug,
    columns = 3,
    pageSize = 12,
}) => {
    const [loading, setLoading] = useState(true);
    const [productItems, setProductItems] = useState(null);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );
    const [total, settotal] = useState("")
    const [keyword, setKeyword] = useState('');

    const getProducts = async(keyword)=> {
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/search?q=${keyword}`);
        setProductItems(res.data.produits)
        settotal(res.data.totalItems)
        setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
    };
    async function getProduct() {
        let queries, SPProducts;
        if (collectionSlug !== undefined) {
            SPProducts = getProducts(
                
            );
        } else {
            queries = {
                _limit: pageSize,
            };
            SPProducts = getProducts()
        }

        if (SPProducts) {
            setTimeout(function () {
                setLoading(false);
            }, 200);
            if (total > 0) {
                setProductItems(productItems);
            }
            return SPProducts;
        } else {
            setProductItems(null);
            return null;
        }
    }

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    useEffect(() => {
        getProduct();
        window.alert(productItems)

        handleSetColumns();
    }, [columns, collectionSlug, pageSize]);

    // Views
    let productItemsView;

    if (!loading && productItems) {
        if (total > 0) {
            const items = productItems.map((item) => {
                return (
                    <div className={classes} key={item.id}>
                        <Product product={item} />
                    </div>
                );
            });
            productItemsView = <div className="row">{items}</div>;
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletonItems = generateTempArray(columns * 2).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return <div className="ps-shop-items">{productItemsView}</div>;
};

export default ProductGroupGridItems;
