import React from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = ({product}) => (
    <div className="ps-product__specification">
        {/* <Link href="/page/blank">
            <a className="report">Report Abuse</a>
        </Link> */}
        <p>
            <strong>reference:</strong> {product.reference}
        </p>
        <p className="categories">
            <strong> Categories:</strong>
            <Link href="/shop">
                <a>{product.category}</a>
            </Link>
            <Link href="/shop">
                <a>{product.secondCategory}</a>
            </Link>
            <Link href="/shop">
                <a>{product.thirdCategory}</a>
            </Link>
        </p>
        {/* <p className="tags">
            <strong> Tags</strong>
            <Link href="/shop">
                <a>sofa</a>
            </Link>
            <Link href="/shop">
                <a>technologies</a>
            </Link>
            <Link href="/shop">
                <a>wireless</a>
            </Link>
        </p> */}

    </div>
);

export default ModuleProductDetailSpecification;
