import React from 'react';
import ImageDirectory from '../Config/ImageDirectory';

class CommentList extends React.Component {

    getIdComment = (e) => {
      this.props.getIdComment(e.target.id)
    }
    
    render() {
      let itemComment = null
      if(this.props.dataComment && Array.isArray(this.props.dataComment)) {
        return itemComment = this.props.dataComment.map((item,index) => {
            if (Number(item.id_comment) === 0) {            
              return (
                <li className='media' key={index}>
                <a className="pull-left" href="/">
                  <img className="media-object" src={ImageDirectory('user/avatar/' + item.image_user)} alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{item.name_user}</li>
                    <li><i className="fa fa-clock-o" /> {item.created_at.split(' ')[1]}</li>
                    <li><i className="fa fa-calendar" /> {item.created_at.split(' ')[0]}</li>
                  </ul>
                  <p>{item.comment}</p>
                  <a className="btn btn-primary" href="#comment-form" id={item.id} onClick={this.getIdComment}><i className="fa fa-reply"/>Replay</a>
                </div>
                  {this.props.dataComment.map((item_child,index_child) => {
                    if(Number(item_child.id_comment) === item.id) {
                        return (
                          <li className='media second-media' key={index_child}>
                          <a className="pull-left" href="/">
                            <img className="media-object" src={ImageDirectory('user/avatar/' + item.image_user)} alt="" />
                          </a>
                          <div className="media-body">
                            <ul className="sinlge-post-meta">
                              <li><i className="fa fa-user" />{item_child.name_user}</li>
                              <li><i className="fa fa-clock-o" /> {item_child.created_at.split(' ')[1]}</li>
                              <li><i className="fa fa-calendar" /> {item_child.created_at.split(' ')[0]}</li>
                            </ul>
                            <p>{item_child.comment}</p>
                          </div>
                        </li>
                        )
                    }
                  })}
              </li>
              )
            }
        })
      }
      return (
          <div>{itemComment}</div>
      );
    }
}
export default CommentList;
















