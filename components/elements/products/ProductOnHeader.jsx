import React from 'react';
import Link from 'next/link';

import {
    StrapiProductPrice,
    StrapiProductThumbnail,
} from '~/utilities/product-helper';

import { useDispatch } from 'react-redux';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';

const ProductOnHeader = ({ product }) => {
    // Views
    const priceView = StrapiProductPrice(product);
    const thumbnailImage = StrapiProductThumbnail(product);
    const dispatch = useDispatch();

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };
    return (
        <div className="ps-product--header-sticky">
            <div className="ps-product__thumbnail">{thumbnailImage}</div>
            <div className="ps-product__wrapper">
                <div className="ps-product__content">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a className="ps-product__title">{product.title}</a>
                    </Link>
                </div>
                <div className="ps-product__shopping">
                    {priceView}
                    <a
                        className="ps-btn"
                        href="#"
                        onClick={(e) => handleAddItemToCompare(e)}>
                      Compare
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductOnHeader;