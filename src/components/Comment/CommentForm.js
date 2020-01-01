import React from 'react';
import Errors from '../Errors/Errors';
import CallApi from '../Config/API';
import Notifications from '../Notifications/Notifications';

class CommentForm extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        errors: '',
        message:'',
      }
    }
    
    handleComment = (e) => {
      e.preventDefault()
      let errors = []
      const token = localStorage.getItem('appState');
      if(token !== null) {
        if(this.state.message === '') {
          errors.push("Vui lòng nhập bình luận")
          this.setState({
            errors: errors
          })
        }else{
          const userData = JSON.parse(token).user;
          let accessToken = userData.auth_token;
          let headers = { 
              'Authorization': 'Bearer '+ accessToken,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
          };
          const formData = new FormData();
          formData.append('id_blog', this.props.idBlog);
          formData.append('id_user', userData.id);
          formData.append('id_comment', this.props.id_comment ? this.props.id_comment : 0);
          formData.append('comment', this.state.message);
          formData.append('image_user', userData.image_user);
          formData.append('name_user', userData.name);
          CallApi('POST','blog/comment/' +this.props.idBlog, formData, headers)
            .then(response => {
              if(response.data.data) {
                this.setState({
                  errors: '',
                  message:'',
                })
                Notifications('Comment post sucessfully', 'success')
                this.props.updateComment(response.data.data)
                this.props.resetIdComment()
              }
            })
            .catch(error => {
              console.log(error)
            })
        }
      }else{
        errors.push("Please login to comment post!")
        this.setState({
          errors: errors
        })
      }
    }
    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

    render(){
      return (
        <div className="replay-box">
            <div className="row">
              <div className="col-sm-4">
                <h2>Leave a replay</h2>
                <form>
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <input type="text" placeholder="write your name..." />
                  <div className="blank-arrow">
                    <label>Email Address</label>
                  </div>
                  <span>*</span>
                  <input type="email" placeholder="your email address..." />
                  <div className="blank-arrow">
                    <label>Web Site</label>
                  </div>
                  <input type="email" placeholder="current city..." />
                </form>
              </div>
              <div className="col-sm-8">
                <Errors error={this.state.errors} />
                <div className="text-area">
                  <div className="blank-arrow">
                    <label>Your Name</label>
                  </div>
                  <span>*</span>
                  <textarea id="comment-form" name="message" rows={11} value={this.state.message} onChange={this.handleChange}/>
                  <a href="/" className="btn btn-primary" onClick={this.handleComment}>post comment</a>
                  </div>
              </div>
            </div>
        </div>
      )
    }
}
export default CommentForm;
















