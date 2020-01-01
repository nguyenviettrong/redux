import React from 'react';
import {
    Link
} from "react-router-dom";

class HeaderBottom extends React.Component {

    render() {
        return (
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            </button>
                        </div>
                        <div className="mainmenu pull-left">
                            <ul className="nav navbar-nav collapse navbar-collapse">
                                <li>
                                <Link to="/"><i className="fa fa-home" /> Home </Link>
                                </li>
                                <li className="dropdown">
                                    <Link to="/"> Shop </Link>
                                </li> 
                                <li className="dropdown">
                                    <Link to="/blog"> Blog </Link>
                                </li> 
                                <li>
                                    <Link to="/contact"> Contact </Link>
                                </li>                            
                            </ul>
                        </div>
                        </div>
                        <div className="col-sm-3">
                        <div className="search_box pull-right">
                            <input type="text" placeholder="Search" />
                        </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    }
}
export default HeaderBottom;