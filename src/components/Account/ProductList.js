import React from 'react';
import CallApi from '../Config/API';
import {
    Link
} from "react-router-dom";
class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataProducts: [],
            activePage: 1,
            itemsCountPerPage: '',
            totalItemsCount: '',
        }
    }

    componentDidMount(){
        CallApi('GET','product', '')
        .then(response => {
            // console.log(response)
            this.setState({
                dataProducts: response.data.data,
                itemsCountPerPage: 10,
                totalItemsCount: 10
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleEdit = (e) => {
        // console.log(e.target.id)
        // this.props.handleEdit(e.target.id)
    }

    handleDelete = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('appState');
        const userData = JSON.parse(token).user;
        let accessToken = userData.auth_token;
        let headers = { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };
        CallApi('GET','user/delete-product/' + e.target.id, '',headers)
        .then(response => {
            // console.log(response)
            this.setState({
                dataProducts:response.data.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    render() {
        // console.log(this.state.dataProducts)
        let itemProduct = null
        if(this.state.dataProducts && Array.isArray(this.state.dataProducts)) {
            itemProduct = this.state.dataProducts.map((item,index) => 
                <tr key={index}>
                    <td className="cart_product">
                        <img src="images/cart/one.png" alt="" />
                    </td>
                    <td className="cart_description">
                        <h4><Link to="#">{item.name}</Link></h4>
                    </td>
                    <td className="cart_price">
                        <p>{item.price}</p>
                    </td>
                    <td className="cart_quantity">
                        <Link to={"/account/edit/" + item.id} id={item.id} onClick={this.handleEdit}>Edit</Link>
                    </td>
                    <td className="cart_delete">
                        <Link to="#" id={item.id} className="cart_quantity_delete" onClick={this.handleDelete}>Delete</Link>
                    </td>
                </tr>
            )
        }
        return (
            <div className="table-responsive cart_info">
                <table className="table table-condensed">
                    <thead>
                    <tr className="cart_menu">
                        <td className="image">Image</td>
                        <td className="description">Name</td>
                        <td className="price">Price</td>
                        <td className="quantity">Edit</td>
                        <td className="total">Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                        {itemProduct}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default ProductList;