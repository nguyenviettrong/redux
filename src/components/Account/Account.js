import React from 'react';
import {
    // BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    // Link
} from "react-router-dom";
import ProductAdd from './ProductAdd';
import ProductEdit from './ProductEdit';
import Profile from './Profile';
import ProductList from './ProductList';
import Navbar from './Navbar';
// import ImageDirectory from '../Config/ImageDirectory';
class Account extends React.Component {

    render() {
        if(localStorage["appState"] !== undefined){
            const isLoggedIn = JSON.parse(localStorage["appState"]).isLoggedIn
            if(!isLoggedIn){
                return <Redirect to="/login"></Redirect>
            }
        }else{
            return <Redirect to="/login"></Redirect>
        }
        
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <Navbar />
                        </div>
                        <div id="cart_items" className="col-sm-9">
                            <Switch>
                                <Route exact path='/account' component={ProductList}/>
                                <Route path='/account/add' component={ProductAdd}/>
                                <Route path='/account/edit/:id?' component={ProductEdit}/>
                                <Route path='/account/profile' component={Profile}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Account;