import React from 'react';

import Category from './Sidebar/Category';
import Brand from './Sidebar/Brand';
import Price from './Sidebar/Price';
import Shipping from './Sidebar/Shipping';
import FeaturedItems from './FeaturedItems';
import CategoryTab from './CategoryTab';
import RecommendedItems from './RecommendedItems';

class Home extends React.Component {
 
    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                    <div className="col-sm-3">
                        <div className="left-sidebar">
                        <Category />
                        <Brand />
                        <Price />
                        <Shipping />
                        </div>
                    </div>
                    <div className="col-sm-9 padding-right">
                        <FeaturedItems />
                        <CategoryTab />
                        <RecommendedItems />
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Home;