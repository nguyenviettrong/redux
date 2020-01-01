import React from 'react';
import Errors from '../Errors/Errors';
import CallApi from '../Config/API';
import Notifications from '../Notifications/Notifications';
import {
    Redirect
} from "react-router-dom";

class Register extends React.Component {

    constructor(props){
        super(props)
        const token = localStorage.getItem('appState');
        let isLoggedIn = false
        if(token !== null){
            isLoggedIn = true
        }
        this.state = {
            name:'',
            password:'',
            email:'',           
            emailValid: false,
            address:'',
            phone: '',
            avatar: null,
            errors: '',
            isLoggedIn: isLoggedIn
        }
    }

    strengthPassword = (password) => {
        let val= password;
        let no=0;
        if( val !== "" ) {
            if(val.length<=6) no=1;
            if(val.length>6 && (val.match(/[a-z]/) || val.match(/\d+/) || val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)))no=2;
            if(val.length>6 && ((val.match(/[a-z]/) && val.match(/\d+/)) || (val.match(/\d+/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) || (val.match(/[a-z]/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))))no=3;
            if(val.length>6 && val.match(/[a-z]/) && val.match(/\d+/) && val.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))no=4;
        }
        return no;
    }
    
    handleUpload = (e) => {
        var file = e.target.files[0];
        let size = 3000000;
        let errors = [];
        let file_type = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ]
        if (file.size > size) {
           errors.push("File is too large, please pick a smaller file")
        }else if ( !file_type.includes(file.type) ){
            errors.push("Please upload jpg or png type file")
        }else{
            const file = e.target.files;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    avatar: e.target.result,
                    file: file[0]
                })
            };
            reader.readAsDataURL(file[0]);
        }
        this.setState({
            errors: errors
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { name, password, email, address, phone  } = this.state;
        let errors = [];

        if(name === ''){
            errors.push("Please enter your name!")
        }
        if(email === ''){
            errors.push("Please enter your email!")
        }
        if(address === ''){
            errors.push("Please enter your address!")
        }
        if(phone === ''){
            errors.push("Please enter your phone!")
        }
        if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            errors.push("Please enter valid email!")
        }
        if(password === ''){
            errors.push("Please enter your password!")
        }
        switch(this.strengthPassword(password)) {
            case 1:
                errors.push("Password is very weak!")
              break;
            case 2:
                errors.push("Password is medium!")
              break;
            default:
        }
       
        if (errors.length > 0) {
            this.setState({
                errors: errors
            });
        }else{
            this.setState({
                errors: ''
            });
            const formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('address', this.state.address);
            formData.append('phone', this.state.phone);
            formData.append('password', this.state.password);
            formData.append('avatar', this.state.avatar);
            
            CallApi('POST','register', formData)
            .then(response => {
                if(response.data.errors) {
                    // if(Array.isArray(response.data.errors)){
                    //     response.data.errors.map((item,key) => 
                    //     Notifications(item, 'danger')
                    //     ) 
                    // }else{
                    //     Object.keys(response.data.errors).map((key,item) => 

                    //     )
                    // }
                    Notifications("Register fails!", 'danger')
                }else{
                    Notifications('Register successfully!', 'success')
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
        const { name, email, address, phone, password  } = this.state;
        let disabledButton = true
        if ( name.length > 0 && email.length > 0  && address.length > 0 && phone.length > 0 && password.length > 0  ){
            disabledButton = false
        }
  
        return (
            <section className="mtb-2">
                <div className="container">
                    <div className="col-sm-12">
                        <div className="signup-form">
                            <h2>New User Signup!</h2>
                            <Errors error={this.state.errors}/>
                            <form action="#" onSubmit={this.handleSubmit}>
                            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                            <input type="text" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                            <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                            <input type="text" name="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} />
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                            <input type="file" name="file" onChange={this.handleUpload}/>
                            <button type="submit" className="btn btn-default" disabled={disabledButton}>Signup</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Register;