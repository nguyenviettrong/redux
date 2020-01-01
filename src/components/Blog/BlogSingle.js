import React from 'react';
import CallApi from '../Config/API';
import {
    NavLink
} from "react-router-dom";
// import Notifications from '../Notifications/Notifications';
import Ratings from '../Comment/Ratings';
import CommentList from '../Comment/CommentList';
import CommentForm from '../Comment/CommentForm';

class BlogSingle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            errors: '',
            dataBlogSingle: [],
            dataBlogRelated: [],
            dataComment: [],
            message:'',
        }
    }
    componentDidMount() {
        CallApi('GET','blog/detail/'+ this.props.match.params.slug, '')
        .then(response => {
            this.setState({
                dataBlogSingle: response.data.data,
                dataComment: response.data.data.comment,
            })
        })
        .catch(error => {
            console.log(error)
        })
        // ============Related blog=============
        CallApi('GET','blog/detail-pagination/'+ this.props.match.params.slug, '')
        .then(response => {
            this.setState({
                dataBlogRelated: response.data
            })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    updateComment = (value) => {
      let dataComment = this.state.dataComment.concat(value)
      this.setState({
        dataComment:dataComment
      })
    }
    
    getIdComment = (value) => {
      this.setState({
        id_comment:value
      })
    }
    resetIdComment = () => {
      this.setState({
        id_comment: ''
      })
    }

    showNumberComment = () => {
      let showNumberComment = null
      if(this.state.comment) {
        showNumberComment = <h2>{this.state.comment.length} RESPONSES</h2>
      }
      return showNumberComment
    }
    
    render() {
        let dataBlogSingle = this.state.dataBlogSingle;
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
                    <div className="single-blog-post">
                      <h3>{dataBlogSingle.title}</h3>
                      <div className="post-meta d-flex align-items-center justify-content-between">
                        <ul>
                          <li><i className="fa fa-user" /> Mac Doe</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>

                        <Ratings idBlog={this.props.match.params.slug}/>
                      </div>
                      <a href="true">
                        <img src="images/blog/blog-one.jpg" alt="" />
                      </a>
                      <div dangerouslySetInnerHTML={{ __html: dataBlogSingle.content }} />
                      <div className="pager-area">
                        <ul className="pager pull-right">
                          <li><NavLink to={'/singleblog/'+ this.state.dataBlogRelated.previous}>Pre </NavLink></li>
                          <li><NavLink to={'/singleblog/'+ this.state.dataBlogRelated.next}>Next </NavLink></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="rating-area">
                    <ul className="ratings">
                      <li className="rate-this">Rate this item:</li>
                      <li>
                        <i className="fa fa-star color" />
                        <i className="fa fa-star color" />
                        <i className="fa fa-star color" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </li>
                      <li className="color">(6 votes)</li>
                    </ul>
                    <ul className="tag">
                      <li>TAG:</li>
                      <li><a className="color" href="true">Pink <span>/</span></a></li>
                      <li><a className="color" href="true">T-Shirt <span>/</span></a></li>
                      <li><a className="color" href="true">Girls</a></li>
                    </ul>
                  </div>
                  <div className="socials-share">
                    <a href="true"><img src="images/blog/socials.png" alt="" /></a>
                  </div>
                  <div className="media commnets">
                    <a className="pull-left" href="/">
                      <img className="media-object" src="images/blog/man-one.jpg" alt="" />
                    </a>
                    <div className="media-body">
                      <h4 className="media-heading">Annie Davis</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                      <div className="blog-socials">
                        <ul>
                          <li><a href="true"><i className="fa fa-facebook" /></a></li>
                          <li><a href="true"><i className="fa fa-twitter" /></a></li>
                          <li><a href="true"><i className="fa fa-dribbble" /></a></li>
                          <li><a href="true"><i className="fa fa-google-plus" /></a></li>
                        </ul>
                        <a className="btn btn-primary" href="true">Other Posts</a>
                      </div>
                    </div>
                  </div>
                  <div className="response-area">
                    {this.showNumberComment()}
                    <ul className="media-list">
                        <CommentList dataComment={this.state.dataComment} getIdComment={this.getIdComment}/>
                    </ul>					
                  </div>
                  <CommentForm resetIdComment={this.resetIdComment} id_comment={this.state.id_comment} updateComment={this.updateComment} idBlog={this.props.match.params.slug}/>
                </div>	
              </div>
            </div>
          </section>
        );
    }
}
export default BlogSingle;