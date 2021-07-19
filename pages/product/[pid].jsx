import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import ContainerProductDetail from '~/components/layouts/ContainerProductDetail';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ContainerPage from '~/components/layouts/ContainerPage';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import axios from 'axios'
const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const { title } = router.query;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    
    async function getProduct() {
        setLoading(true);
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/getProductByReference?reference=${pid}`);
        if (res) {
            setProduct(res.data);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
        console.log(res.data)

    }
    useEffect(() => {
        getProduct(pid);
    }, [pid]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product ? product.title : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = <HeaderProduct product={product} />;
        } else {
            headerView = <HeaderDefault />;
        }
    } else {
        productView = <SkeletonProductDetail />;
    }
    return (
        <ContainerProductDetail title={product ? product.title : 'Loading...'}>
            {headerView}
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div className="ps-page--product">
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            {/* <ProductWidgets /> */}
                        </div>
                    </div>

                    {/* <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                    /> */}
                    <RelatedProduct collectionSlug="shop-recommend-items"  product={product}/>
                </div>
            </div>
        </ContainerProductDetail>
    );
};

export default ProductDefaultPage;
