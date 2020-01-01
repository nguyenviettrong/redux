import React from 'react';
import {AppContext} from '../AppContext'
import {Link} from 'react-router-dom'
class Wishlist extends React.Component {
    static contextType = AppContext

    render() {
        let itemWishlist = null
        // let wishlistElement = null
        if(localStorage["appState"] !== undefined){
            let wishlist = JSON.parse(localStorage["appState"]).wishlist
            if(wishlist.length > 0){
                itemWishlist = wishlist.map((item,index) =>
                    <div className="col-sm-4" key={index}>
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src="images/home/recommend1.jpg" alt="" />
                                    <h2>${item.price}</h2>
                                    <p>{item.name}</p>
                                    <div>
                                        <button type="button" className="btn btn-default mr-2" onClick={ () => this.context.handleAddCart(item)}><i className="fa fa-shopping-cart"></i> Add to cart</button>
                                        <Link to="#" className="text-danger" onClick={ () => this.context.toggleWishlist(item)}>Remove wishlist</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                itemWishlist = <p>Wishlist is empty!</p>
            }
        }
        return (
            <div className="container recommended_items">
                <div className="row">
                    {itemWishlist}
                </div>
            </div>
        );
    }
}
export default Wishlist;