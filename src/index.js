import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from './components/Layout/Home';
import Login from './components/Member/Login';
import Register from './components/Member/Register';
import Checkout from './components/Checkout/Checkout';
import Account from './components/Account/Account';
import Cart from './components/Cart/CartList';
import Wishlist from './components/Layout/Wishlist';
import Contact from './components/Layout/Contact';
import Blog from './components/Blog/BlogList';
import SingleBlog from './components/Blog/BlogSingle';
import Product from './components/Product/ProductList';
import ProductSingle from './components/Product/ProductSingle';
import NotFound from './components/Layout/NotFound';

ReactDOM.render(
    <div>
        <Router>
            <App>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/product" component={Product}/>
                    <Route path="/productsingle/:slug" component={ProductSingle}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/blog" component={Blog}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/wishlist" component={Wishlist}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/singleblog/:slug" component={SingleBlog} />
                    <Route component={NotFound}/>
                </Switch>
            </App>
        </Router>
    </div>
    , document.getElementById('root'));

serviceWorker.unregister();
