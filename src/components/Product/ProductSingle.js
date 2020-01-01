import React from 'react';
import {Link} from 'react-router-dom'
import CallApi from '../Config/API';
import ImageDirectory from '././../Config/ImageDirectory';
import Category from '../Layout/Sidebar/Category';
import Brand from '../Layout/Sidebar/Brand';
import Price from '../Layout/Sidebar/Price';
import Shipping from '../Layout/Sidebar/Shipping';

class ProductSingle extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            errors: '',
            dataProductSingle:'',
            dataBlogRelated:'',
            category: [],
            brand: [],
            images:[]
        }
    }

    componentDidMount() {
        CallApi('GET','product/detail/'+ this.props.match.params.slug, '')
        .then(response => {
            // console.log(JSON.parse(response.data.data.image))
            // var images = [];
            // for (var i = 0; i < JSON.parse(response.data.data.image).length; ++i){
            //     images.push(JSON.parse(response.data.data.image)[i]);
            // }
            this.setState({
                dataProductSingle: response.data.data,
                images:JSON.parse(response.data.data.image)
            })
        })
        .catch(error => {
            console.log(error)
        })

        CallApi('GET','category-brand', '')
        .then(response => {
            this.setState({
                category: response.data.category,
                brand: response.data.brand,
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        const dataProductSingle = this.state.dataProductSingle
        let brandName = null
        let categoryName = null
        if(this.state.brand.length > 0) {
            let index = this.state.brand.findIndex(x => x.id === dataProductSingle.id_brand);
            if(index >= 0) {
                brandName = this.state.brand[index].brand;
            }
        }

        if(this.state.category.length > 0) {
            let index = this.state.category.findIndex(x => x.id === dataProductSingle.id_category);
            if(index >= 0) {
                categoryName = this.state.category[index].category;
            }
        }
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
                            <div className="product-details">
                                <div className="col-sm-5">
                                <div className="view-product">
                                    <img src={ImageDirectory("user/product/2/" +this.state.images[0])} alt="" />
                                    <h3>ZOOM</h3>
                                </div>
                                <div id="similar-product" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            {
                                                Object.keys(this.state.images).map((key, i) => (
                                                    <a href="/#" key={i}><img src={ImageDirectory("user/product/2/" + this.state.images[key])} alt="" /></a>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left" />
                                    </a>
                                    <a className="right item-control" href="#similar-product" data-slide="next">
                                    <i className="fa fa-angle-right" />
                                    </a>
                                </div>
                                </div>
                                <div className="col-sm-7">
                                <div className="product-information">
                                    <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                                    <h2>{dataProductSingle.name}</h2>
                                    <p>Web ID: {dataProductSingle.web_id}</p>
                                    <img src="images/product-details/rating.png" alt="" />
                                    <span>
                                    <span>US ${dataProductSingle.price}</span>
                                    <label>Quantity:</label>
                                    <input type="text" defaultValue={1} />
                                    <button type="button" className="btn btn-fefault cart">
                                        <i className="fa fa-shopping-cart" />
                                        Add to cart
                                    </button>
                                    </span>
                                    <p><b>Availability:</b> In Stock</p>
                                    <p><b>Condition:</b> New</p>
                                    <p><b>Brand:</b> {brandName}</p>
                                    <p><b>Category:</b> {categoryName}</p>
                                    <Link to="/"><img src="images/product-details/share.png" className="share img-responsive" alt="" /></Link>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default ProductSingle;