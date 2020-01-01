import React from 'react';
import {
    Redirect
} from "react-router-dom";

class Profile extends React.Component {

    constructor(props){
        super(props)
        const token = localStorage.getItem('appState');
        let isLoggedIn = false
        let user = null

        if(token == null){
            isLoggedIn = false
        }else{
            isLoggedIn = true
            user = JSON.parse(token).user
        }
        this.state = {
            isLoggedIn: isLoggedIn,
            user: user
        }
    }
    
    render() {
        if(!this.state.isLoggedIn){
            return <Redirect to="/login"></Redirect>
        }
       
        return (
            <div>
                <h2>Hello!</h2>
                {/* <Show_errors error={this.state.errors}/> */}
                <form action="#" onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                <input type="text" name="email" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
                <input type="text" name="address" placeholder="Address" value={this.state.address} onChange={this.handleChange} />
                <input type="text" name="phone" placeholder="Phone" value={this.state.phone} onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
                <input type="file" name="file" onChange={this.handleUpload}/>
                <button type="submit" className="btn btn-default">Update</button>
                </form>
            </div>
        );
    }
}
export default Profile;