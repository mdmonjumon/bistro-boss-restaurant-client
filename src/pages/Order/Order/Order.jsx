import Cover from "../../shared/Cover/Cover";
import orderCoverImg from '../../../assets/shop/order.jpg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useLocation, useParams } from "react-router-dom";


const Order = () => {
    const { category } = useParams()
    const location = useLocation();


    const tabList = ["salad", "pizza", "soup", "dessert", "drinks"];

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        if (category) {
            setTabIndex(tabList.indexOf(category))
        }
    }, [])

    const { menu } = useMenu()
    const soups = menu.filter(item => item.category === "soup");
    const desserts = menu.filter(item => item.category === "dessert");
    const pizzas = menu.filter(item => item.category === "pizza");
    const salads = menu.filter(item => item.category === "salad");
    const drinks = menu.filter(item => item.category === "drinks");

    return (
        <div>
            <title>Bistro Boss | Order Food</title>

            <section>
                <Cover image={orderCoverImg} title="Order Food" intro="WOULD YOU LIKE TO TRY A DISH?"></Cover>
            </section>

            <section className="text-center my-10">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        {/* <Tab>SALAD</Tab>
                        <Tab>PIZZA</Tab>
                        <Tab>SOUPS</Tab>
                        <Tab>DESSERTS</Tab>
                        <Tab>DRINKS</Tab> */}

                        {
                            tabList.map((list, i) => <Tab key={i}><span className="uppercase">{list}</span></Tab>)
                        }
                    </TabList>
                    <TabPanel>
                        <OrderTab items={salads}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzas}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soups}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={desserts}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
                </Tabs>

            </section>

        </div>
    );
};

export default Order;