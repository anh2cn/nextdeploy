import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { Radio, Input } from 'antd';

import { useRouter } from 'next/router';
import axios from 'axios'
const WidgetShopCategories = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);

    

    async function getCategories() {
        setLoading(true);
        const res = await axios.get("http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/getCategories");
        if (res) {
            setCategories(res.data);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }
    function handleSelectBrand(e) {
        Router.push(`/category/${e.target.value}`);
    }

    useEffect(() => {
        getCategories();
    }, []);

    // Views
    let categoriesView;
    if (!loading) {
        if (categories && categories.length > 0) {
            const items = categories.map((item) => (
                <li
                    key={slug} >
                    <Link href={`shop/${slug}`}>{item}</Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop  widget_shop--brand">
            <h4 className="widget-title">Categories</h4>
            <figure>
                <Radio.Group
                    defaultValue={slug}
                    options={categories}
                    onChange={handleSelectBrand}
                />
            </figure>
        </aside>
    );
};

export default WidgetShopCategories;
