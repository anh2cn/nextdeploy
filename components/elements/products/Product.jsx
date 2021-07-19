import React from 'react';
import Link from 'next/link';
import Rating from '../Rating';

import {
    StrapiProductBadge,
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';

const Product = ({ product }) => {
    // Views
    const priceView = StrapiProductPrice(product);
    const thumbnailImage = StrapiProductThumbnail(product);
    const badgeView = StrapiProductBadge(product);
    var res=product.title.split(" ").join('_');   

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
{thumbnailImage}                {badgeView}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <Link href="/shop">
                    <a className="ps-product__vendor">Bon Plan</a>
                </Link>
                <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${product.reference}?title=${res}`}>
                        <a className="ps-product__title">{product.title}</a>
                    </Link>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>02</span>
                    </div>
                   {product.currentPrice}
                </div>
                <div className="ps-product__content hover">
                <Link href="/product/[pid]" as={`/product/${product.reference}?title=${res}`}>
                        <a className="ps-product__title">{product.title}</a>
                    </Link>
                    {priceView}
                </div>
            </div>
        </div>
    );
};

export default Product;
