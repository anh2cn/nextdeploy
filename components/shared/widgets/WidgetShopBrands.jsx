import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Checkbox } from 'antd';
import { Radio, Input } from 'antd';
import { useRouter } from 'next/router';
import axios from 'axios'
import { List, Avatar, Button, Skeleton } from 'antd';

const WidgetShopBrands = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [brands, setBrands] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getCategories() {
        setLoading(true);
        const res = await axios.get("http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/getAllBrands/");
        if (res) {
            setBrands(res.data);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    function handleSelectBrand(e) {
        Router.push(`/brand/${e.target.value}`);
    }

    useEffect(() => {
        getCategories();
    }, []);

    // Views
    let brandsView;
    if (!loading) {
        if (brands && brands.length > 0) {
            const items = brands.map((item) => (
                <li key={item.id}>
                    <Link href={`shop/${item.slug}`}>{item}</Link>
                </li>
            ));
            brandsView = <ul className="ps-list--brands">{items}</ul>;
        } else {
        }
    } else {
        brandsView = <p>Loading...</p>;
    }
    return (
        <aside className="widget widget_shop widget_shop--brand">
            <h4 className="widget-title">By Brands</h4>

            <figure>
                <Radio.Group
                    defaultValue={slug}
                    options={brands}
                    onChange={handleSelectBrand}
                />
            </figure>
        </aside>
    );
};

export default WidgetShopBrands;
