import React from 'react';
import CallApi from '../Config/API';
import ImageDirectory from '../Config/ImageDirectory';
import {
    NavLink
} from "react-router-dom";

import Pagination from "react-js-pagination";

class BlogList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dataBlog: [],
            activePage: 1,
            itemsCountPerPage: '',
            totalItemsCount: '',
        }
    }

    componentDidMount(){
        CallApi('GET','blog', '')
        .then(response => {
            this.setState({
                dataBlog: response.data.blog.data,
                itemsCountPerPage: response.data.blog.per_page,
                totalItemsCount: response.data.blog.total
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        CallApi('GET','blog?page='+pageNumber, '')
        .then(response => {
            this.setState({
                posts: response.data.blog.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    render() {
        let itemBlog = null
        if(this.state.dataBlog && Array.isArray(this.state.dataBlog)) {
            itemBlog = this.state.dataBlog.map((item,index) =>
                <div className="single-blog-post" key={index}>
                    <h3>{item.title}</h3>
                    <div className="post-meta">
                        <ul>
                        <li><i className="fa fa-user" /> Mac Doe</li>
                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <span>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                        </span>
                    </div>
                    <NavLink to={'/singleblog/'+item.id}>
                        <img src={ImageDirectory('Blog/image/' + item.image)} alt="" />
                    </NavLink>
                    
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                    <NavLink to={'/singleblog/'+item.id} className="btn btn-primary"> Read More </NavLink>
                </div>
            );
        }      
        
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            Sidebar
                        </div>
                        <div className="col-sm-9">
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            {itemBlog}
                            <div className="mt-2">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.totalItemsCount}
                                    pageRangeDisplayed={10}
                                    onChange={this.handlePageChange}
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default BlogList;