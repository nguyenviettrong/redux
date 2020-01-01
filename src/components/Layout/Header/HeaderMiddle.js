import React from 'react';
import {
    Link,
} from "react-router-dom";
import { AppContext } from '../../AppContext'

class HeaderMiddle extends React.Component {
    static contextType = AppContext

    renderLoginLogout () {
        if(localStorage["appState"] !== undefined){
            const isLoggedIn = JSON.parse(localStorage["appState"]).isLoggedIn
            const cartNumber = JSON.parse(localStorage["appState"]).cart.length
            const wishlistNumber = JSON.parse(localStorage["appState"]).wishlist.length
            if(isLoggedIn){
                return (
                <React.Fragment>
                    <li><Link to="/wishlist"><i className="fa fa-star" /> Wishlist <span className="badge">{wishlistNumber}</span></Link></li>
                    <li><Link to="/checkout"><i className="fa fa-credit-card" /> Checkout </Link></li>                
                    <li><Link to="/account"><i className="fa fa-user" /> Account </Link></li> 
                    <li><Link to="/cart"><i className="fa fa-shopping-cart" /> Cart <span className="badge">{cartNumber}</span></Link></li>                
                    <li><Link to="#" onClick={ () => this.context.logoutContext() }><i className="fa fa-sign-out" /> Logout</Link></li>
                </React.Fragment>
                )
            }
        }else{
            return (
                <React.Fragment>
                    <li><Link to="/register"><i className="fa fa-registered"></i> Register </Link></li>
                    <li><Link to="/login"><i className="fa fa-sign-in" /> Login </Link></li>
                </React.Fragment>
            )
        }
    }

    render() {
        // console.log("header middle")
        return (
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                    <div className="col-md-4 clearfix">
                        <div className="logo pull-left">
                        <Link to="/"><img src="images/home/logo.png" alt="" /></Link>
                        </div>
                        <div className="btn-group pull-right clearfix">
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            USA
                            <span className="caret" />
                            </button>
                            <ul className="dropdown-menu">
                            <li><a href="true">Canada</a></li>
                            <li><a href="true">UK</a></li>
                            </ul>
                        </div>
                        <div className="btn-group">
                            <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                            DOLLAR
                            <span className="caret" />
                            </button>
                            <ul className="dropdown-menu">
                            <li><Link to="#">Canadian Dollar</Link></li>
                            <li><Link to="#">Pound</Link></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-8 clearfix">
                        <div className="shop-menu clearfix pull-right">
                        <ul className="nav navbar-nav">
                            {this.renderLoginLogout()}
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default HeaderMiddle;
