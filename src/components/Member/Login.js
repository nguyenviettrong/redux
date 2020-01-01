import React from 'react';
import CallApi from '../Config/API';
import Errors from '../Errors/Errors';
import Notifications from '../Notifications/Notifications';
import {
    Redirect
} from "react-router-dom";
import { AppContext } from '../AppContext'
import { AppConsumer } from '../AppContext'

class Login extends React.Component {
    static contextType = AppContext
    constructor(props){
        super(props)
        let isLoggedIn = false
        if(localStorage["appState"] !== undefined){
            isLoggedIn = JSON.parse(localStorage["appState"]).isLoggedIn
        }
        this.state = {
            email:'',
            password:'',
            errors: '',
            isLoggedIn: isLoggedIn
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {email,password} = this.state;
        let errors = [];

        if(email === ''){
            errors.push("Please enter your email!");
        }
        if(password === ''){
            errors.push("Please enter your password!")
        }
       
        if (errors.length >0) {
            this.setState({
                errors: errors
            })
        } else {
            this.setState({
                errors: ''
            });
            const formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            
            CallApi('POST','login', formData)
                .then(response => {
                    if(response.data.success) {
                        let userData = {
                            name: response.data.Auth.name,
                            id: response.data.Auth.id,
                            email: response.data.Auth.email,
                            auth_token: response.data.success.token,
                            image_user: response.data.Auth.avatar,
                            timestamp: new Date().toString()
                        };
                        let appState = {
                            isLoggedIn: true,
                            user: userData,
                            cart: [],
                            wishlist: [],
                        };
                        localStorage["appState"] = JSON.stringify(appState);
                        this.setState({
                            isLoggedIn: true,
                        });
                        
                        Notifications('Login successfully!', 'success')
                    }else{
                        Notifications('Email or Password incorrect!', 'danger')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    render() {
        if(this.state.isLoggedIn){
            return <Redirect to="/account"></Redirect>
        }
        return (
            <AppConsumer>
            {({numberCart,addCart}) => (
                <section className="mtb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-offset-4 col-sm-4 col-12">
                            <div className="login-form">
                                <h2>Login to your account</h2>
                                <Errors error={this.state.errors} />
                                <form action="#" onSubmit={this.handleSubmit}>
                                <input type="text" placeholder="Name or Email" name="email" value={this.state.email} onChange={this.handleChange}/>
                                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                <span>
                                    <input type="checkbox" className="checkbox" /> 
                                    Keep me signed in
                                </span>
                                <button type="submit" className="btn btn-default">Login</button>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            </AppConsumer>
        )
    }
}
export default Login;