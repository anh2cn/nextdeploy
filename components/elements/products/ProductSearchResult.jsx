import React from 'react';
import Link from 'next/link';

import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';
import Rating from '~/components/elements/Rating';

const ProductSearchResult = ({ product }) => {
    var res=product.title.split(" ").join('_');   

    return (
        <div className="ps-product ps-product--wide ps-product--search-result">
            <div className="ps-product__thumbnail">
                <img src={product.imageUrl} alt={product.title} />    
                        </div>
            <div className="ps-product__content">
            <Link href="/product/[pid]" as={`/product/${product.reference}?title=${res}`}>
                    <a className="ps-product__title">{product.title}</a>
                </Link>
                <div className="ps-product__rating">
                    <Rating />
                    <span>{product.ratingCount}</span>
                </div>
                {StrapiProductPrice(product)}
            </div>
        </div>
    );
};
export default ProductSearchResult;
