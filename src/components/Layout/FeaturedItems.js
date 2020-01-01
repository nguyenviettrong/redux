import React from 'react';
import CallApi from '././../Config/API';
import ImageDirectory from '././../Config/ImageDirectory';
import { AppContext } from '../AppContext'
import {Link} from 'react-router-dom';

class FeaturedItems extends React.Component {
    static contextType = AppContext
    constructor(props){
      super(props);
      this.state = {
          dataProducts: [],
      }
    }
    componentDidMount(){
        CallApi('GET','product', '')
        .then(response => {
          // console.log(response)
            this.setState({
                dataProducts: response.data.data,
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        let wishlistId = []       
        if(localStorage["appState"] !== undefined){
          if(JSON.parse(localStorage.getItem('appState')).wishlist.length > 0) {            
            JSON.parse(localStorage.getItem('appState')).wishlist.map((wishlistitem,index) => {
              wishlistId.push(wishlistitem.id)
            })
          }  
        }
        let itemProduct = null        
        if(this.state.dataProducts && Array.isArray(this.state.dataProducts)) {
            return itemProduct = this.state.dataProducts.map((item,index) =>  {         
                return (
                  <div className="col-sm-4" key={index}>
                    <div className="product-image-wrapper">
                      <div className="single-products">
                        <div className="productinfo text-center">
                          <img src={ImageDirectory("user/product/2/" + JSON.parse(item.image)[0] )} alt="" />
                          <h2>${item.price}</h2>
                          <Link to={"/productsingle/" + item.id}><p>{item.name}</p></Link>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>${item.price}</h2>
                            <Link to={"/productsingle/" + item.id}><p>{item.name}</p></Link>
                            <Link to="#" className="btn btn-default add-to-cart" onClick={ () => this.context.handleAddCart(item)}><i className="fa fa-shopping-cart" />Add to cart</Link>
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">                          
                          <li key={index}><Link to="#" onClick={ () => this.context.toggleWishlist(item)}><i className={ (wishlistId.includes(item.id)) ? '' : 'fa fa-plus'} />{ (wishlistId.includes(item.id)) ? 'Remove wishlist' : 'Add to wishlist'}</Link></li>                        
                          <li><Link to="#"><i className="fa fa-plus-square" />Add to compare</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              }
            )
        }
        return (
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {itemProduct}
            </div>
        );
    }
}
export default FeaturedItems;