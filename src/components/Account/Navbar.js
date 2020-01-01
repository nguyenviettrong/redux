import React from 'react';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
} from "react-router-dom";
class Navbar extends React.Component {
    render () {
        return (
            <div className="panel-group category-products" id="accordian">
                <div className="panel panel-default">                                
                    <div className="panel-body">
                        <ul>
                            <li>
                                <Link to="/account/profile"><i className="fa fa-angle-right"></i> My profile </Link>
                            </li>
                            <li>
                                <Link to="/account"><i className="fa fa-angle-right"></i> All product</Link>
                            </li>
                            <li>
                                <Link to="/account/add"><i className="fa fa-angle-right"></i> Add new product</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Navbar