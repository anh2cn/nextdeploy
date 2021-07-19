import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import ModuleProductWideActions from '~/components/elements/products/modules/ModuleProductWideActions';

const ProductWide = ({ product }) => {

    var res=product.title.split(" ").join('_');   

    return (
        <div className="ps-product ps-product--wide">
            <div className="ps-product__thumbnail">
               <img src={product.imageUrl} alt="" /> 
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content">
                    <Link href="/product/[pid]" as={`/product/${product.reference}?title=${res}`}>
                        <a className="ps-product__title">{product.title}</a>
                    </Link>
                    <p className="ps-product__vendor">
                        Sold by:
                        <Link href="/shop">
                            <a>{product.store}</a>
                        </Link>
                    </p>
                    <ul className="ps-product__desc">
                        <p> {product.description}</p>
                    </ul>
                </div>
                <ModuleProductWideActions product={product} />
            </div>
        </div>
    );
};

export default ProductWide;
