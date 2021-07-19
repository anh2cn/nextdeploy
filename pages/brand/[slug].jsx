import React, { useEffect, useState } from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import axios from "axios"
import { Pagination } from 'antd';

const ProductByBrandScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [brand, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ProductItem, setProductItem] = useState("")
    const [total, settotal] = useState("")
    const [currentpage, setcurrentpage] = useState("1")
    const [pageSize, setpageSize] = useState("10")

    const getBrand = async()=> {
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/getAllByBrand?brand=${slug}&page=${currentpage}&size=${pageSize}`);
        setProductItem(res.data.produits)
        settotal(res.data.totalItems)
        setcurrentpage(res.data.currentPage)

        console.log(ProductItem)
        setTimeout(
                        function () {
                            setLoading(false);
                        }.bind(this),
                        250
                    );
    };
    // async function getCategry() {
    //     setLoading(true);
    //     if (slug) {
    //         const responseData = await ProductRepository.getProductsByBrand(
    //             slug
    //         );
    //         if (responseData) {
    //             setCategory(responseData);
    //             setTimeout(
    //                 function () {
    //                     setLoading(false);
    //                 }.bind(this),
    //                 250
    //             );
    //         }
    //     } else {
    //         await Router.push('/shop');
    //     }
    // }

    useEffect(() => {
        getBrand();
    }, [slug,currentpage,pageSize]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/',
        },
        {
            text: ProductItem ? ProductItem.name : 'Product brand',
        },
    ];
    const paginate = (currentpage, pageSize) => {
        setcurrentpage(currentpage);
        setpageSize(pageSize)
    };
    //Views
    let productItemsViews;
    if (!loading) {
        if (ProductItem && total > 0) {
            productItemsViews = (
                <ProductItems columns={4} products={ProductItem} total={total} />
            );
        } else {
            productItemsViews = <p>No Product found</p>;
        }
    } else {
        productItemsViews = <p>Loading...</p>;
    }

    return (
        <ContainerShop title={ProductItem ? ProductItem.brand : 'Brand'} boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories />
                            <WidgetShopBrands />
                            <WidgetShopFilterByPriceRange />
                        </div>
                        <div className="ps-layout__right">
                            <h3   className="ps-shop__heading">
                                Brand: {slug }
                            </h3>
                            {productItemsViews}
                            <div className="ps-shopping__footer text-center">
                          <div className="ps-pagination">
                    <Pagination
                        total={total }
                        responsive={true}
                        pageSize={pageSize}
                        showTotal={total => `Total ${total} items`}

                        current={currentpage}
                        onChange={paginate
                          }
                    />
                </div>
            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </ContainerShop>
    );
};
export default ProductByBrandScreen;
