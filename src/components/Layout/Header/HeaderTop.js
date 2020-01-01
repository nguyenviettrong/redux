import React from 'react';

class HeaderTop extends React.Component {
    render() {
      return (
        <div className="header_top">
            <div className="container">
                <div className="row">
                <div className="col-sm-6">
                    <div className="contactinfo">
                    <ul className="nav nav-pills">
                        <li><a href="/"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                        <li><a href="/"><i className="fa fa-envelope" /> info@domain.com</a></li>
                    </ul>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="social-icons pull-right">
                    <ul className="nav navbar-nav">
                        <li><a href="/"><i className="fa fa-facebook" /></a></li>
                        <li><a href="/"><i className="fa fa-twitter" /></a></li>
                        <li><a href="/"><i className="fa fa-linkedin" /></a></li>
                        <li><a href="/"><i className="fa fa-dribbble" /></a></li>
                        <li><a href="/"><i className="fa fa-google-plus" /></a></li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
      );
    }
}
export default HeaderTop;