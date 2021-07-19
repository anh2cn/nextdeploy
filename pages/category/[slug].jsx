import React, { useEffect, useState } from 'react';
import ContainerShop from '~/components/layouts/ContainerShop';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import axios from 'axios'
import { Pagination } from 'antd';


const ProductCategoryScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, settotal] = useState("")
    const [currentpage, setcurrentpage] = useState("5")
    const [pageSize, setpageSize] = useState("10")

    const getCaegory = async()=> {
        const res = await axios.get(`http://5.196.225.103:81/bonplan-0.0.1-SNAPSHOT/getAllByCategory?category=${slug}&page=${currentpage}&size=${pageSize}`);
        setCategory(res.data.produits)
        setcurrentpage(res.data.currentPage)

        settotal(res.data.totalItems)
        console.log(category)
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
    //         const responseData = await ProductRepository.getProductsByCategory(
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
        getCaegory();
    }, [slug ,currentpage,pageSize]);

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
            text: category ? category.category : 'Product category',
        },
    ];

    //Views
    let productItemsViews;

    if (!loading) {
        if (category && total > 0) {
            productItemsViews = (
                <ProductItems columns={4} products={category} total={total} />
            );
        } else {
            productItemsViews = <p>No Product found</p>;
        }
    } else {
        productItemsViews = <p>Loading...</p>;
    }
    const paginate = (currentpage, pageSize) => {
        setcurrentpage(currentpage);
        setpageSize(pageSize)
    };
    return (
        <ContainerShop
            title={category ? category.category : 'Category'}
            boxed={true}>
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
                            <h3 className="ps-shop__heading">
                                {category && category.category}
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
export default ProductCategoryScreen;
