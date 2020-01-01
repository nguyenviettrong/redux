import React from 'react';
import CallApi from '../Config/API';
import Errors from '../Errors/Errors';
import Notifications from '../Notifications/Notifications';
import {
    Redirect
} from "react-router-dom";

class ProductAdd extends React.Component {

    constructor(props){
        super(props)
        const token = localStorage.getItem('appState');
        let isLoggedIn = false
        if(token == null){
            isLoggedIn = false
        }else{
            isLoggedIn = true
        }
        this.state = {
            all_category:'',
            all_brand:'',
            category: 1,
            brand: 1,
            name:'',
            web_id: '',
            status:'',
            price:'',
            sale:'',
            condition: '',
            detail:'',
            company:'',
            highlight:false,
            image:[],
            active: false,
            errors: '',
            isLoggedIn: isLoggedIn
        }
    }
    
    componentDidMount() {
        CallApi('GET','category-brand', '')
        .then(response => {
            this.setState({
                all_category: response.data.category,
                all_brand: response.data.brand,
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleUpload = (e) => {
        const files = Array.from(e.target.files)
        let size = 3000000
        let limit_file = 5
        let err = []
        let file_type = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ]
        if(Object.keys(files).length > limit_file){
            err.push("Please upload file less than" + limit_file)
        }
        Object.keys(files).filter((o)=> {
            if (files[o].size > size) {
                err.push("File "+files[o].name+" too large, please pick a smaller file")
            }else if ( !file_type.includes(files[o].type) ){
                err.push("Please upload jpg or png type file")
            }
        });

        if(!err.length > 0){
            let image = []
            const files = Array.from(e.target.files)
            files.forEach((file, i) => {
                image.push(file);
            })
            this.setState({
                image: image
            });
        }

        this.setState({
            errors: err
        });
    }

    toggleChangeActive = (e) => {
        this.setState({
            active: !this.state.active,
        });
    }
    toggleChangeHighlight = (e) => {
        this.setState({
            highlight: !this.state.highlight,
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        let err = [];

        if(this.state.name === ''){
            err.push("Please enter name!");
        }
        if(this.state.price === ''){
            err.push("Please enter your price!")
        }
        if(this.state.sale === ''){
            err.push("Please enter your sale!")
        }
        if(!this.state.image.length > 0){
            err.push("Please enter choose image!")
        }
       
        if (err.length >0) {
            this.setState({
                errors: err
            })
        } else {
            this.setState({
                errors: ''
            });
            const token = localStorage.getItem('appState');
            if(token != null) {
                let accessToken = JSON.parse(token).user.auth_token;
                let headers = { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                };

                const formData = new FormData();
                formData.append('category', this.state.category);
                formData.append('brand', this.state.brand);
                formData.append('id_user', JSON.parse(token).user.id);
                formData.append('name', this.state.name);
                formData.append('web_id', this.state.web_id);
                formData.append('price', this.state.price);
                formData.append('status', this.state.status ? this.state.status : 0);
                formData.append('sale', this.state.sale);
                formData.append('condition', this.state.condition);
                formData.append('detail', this.state.detail);
                formData.append('company', this.state.company);
                formData.append('highlight', this.state.highlight ? 1 : 0);
                formData.append('active', this.state.active ? 1 : 0);
                this.state.image.map((item,index) => {
                    formData.append('file[]', item);
                })

                CallApi('POST','user/add-product', formData, headers)
                .then(response => {
                    // console.log(response)
                    if(response.data.response === 'success'){
                        Notifications("Add product successfully!","success")
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        }
    }

    render() {
        
        if(!this.state.isLoggedIn){
            return <Redirect to="/login"></Redirect>
        }
        return (
            <section className="mtb-2">
                <div className="signup-form">
                    <h2>Add product!</h2>
                    <Errors error={this.state.errors}/>
                    <form action="#" onSubmit={this.handleSubmit}>

                    <select name="category" value={this.state.category} onChange={this.handleChange} className="mb-2">
                        {Object.keys(this.state.all_category).map((item,index) => 
                            <option key={index} value={this.state.all_category[item].id}>{this.state.all_category[item].category}</option>
                        )}
                    </select>

                    <select name="brand" value={this.state.brand} onChange={this.handleChange} className="mb-2">
                        {Object.keys(this.state.all_brand).map((item,index) => 
                            <option key={index} value={this.state.all_brand[item].id}>{this.state.all_brand[item].brand}</option>
                        )}
                    </select>

                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" name="web_id" placeholder="Web_id" value={this.state.web_id} onChange={this.handleChange} />
                    <input type="text" name="price" placeholder="Price" value={this.state.price} onChange={this.handleChange} />
                    <select name="status" value={this.state.status} onChange={this.handleChange} className="mb-2">
                        <option value="1">New</option>
                        <option value="2">Sale</option>
                    </select>
                    <input type="text" name="sale" placeholder="Sale" value={this.state.sale} onChange={this.handleChange} />
                    <input type="text" name="condition" placeholder="Condition" value={this.state.condition} onChange={this.handleChange} />
                    <input type="text" name="detail" placeholder="Detail" value={this.state.detail} onChange={this.handleChange} />
                    <input type="text" name="company" placeholder="Company" value={this.state.company} onChange={this.handleChange} />

                    <input type="file" name="image[]" multiple onChange={this.handleUpload}/>
                    <div>
                        <label className="d-flex">
                            <input type="checkbox"
                            name="highlight"
                            checked={this.state.highlight}
                            onChange={this.toggleChangeHighlight}
                            />
                            <span>Highlight product?</span>
                        </label>
                    </div>

                    <div>
                        <label className="d-flex">
                            <input type="checkbox"
                            name="active"
                            checked={this.state.active}
                            onChange={this.toggleChangeActive}
                            />
                            <span>Active product?</span>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-default">Add product</button>
                    
                    </form>
                </div>
            </section>
        );
    }
}
export default ProductAdd;