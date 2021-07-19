import React from 'react';
import Link from 'next/link';

const ModuleProductDetailDescription = ({ product }) => (
    <div className="ps-product__desc">
        <p>
            Sold By:
            <Link href="/shop">
                <a>
                    <strong> {product.store}</strong>
                </a>
            </Link>
        </p>
        <ul className="ps-list--dot">
            <p> 
               {product.description}
               </p>
        </ul>
    </div>
);

export default ModuleProductDetailDescription;
