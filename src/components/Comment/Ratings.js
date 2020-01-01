import React from 'react';
import CallApi from '../Config/API';
import Notifications from '../Notifications/Notifications';
import StarRatings from 'react-star-ratings';

class Ratings extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        rating: 2.5,
        errors: ''
      }
    }

    componentDidMount() {
      CallApi('GET','blog/rate/'+ this.props.idBlog, '')
      .then(response => {
          let sum_rate = null;
          if (Object.keys(response.data.data).length > 0) {
            Object.keys(response.data.data).map((key, i) => (
              sum_rate = sum_rate + response.data.data[key].rate
            ))
            let rating = sum_rate/(Object.keys(response.data.data).length)
            rating = parseFloat(rating.toFixed(2));
            this.setState({
              rating: rating
            });
          }
      })
      .catch(error => {
          console.log(error)
      })
    }

    changeRating = ( value, name ) => {
      const token = localStorage.getItem('appState');
      if(token !== null) {
        this.setState({
          rating: value
        });
        let userData = JSON.parse(token).user
        let accessToken = userData.auth_token;
        let headers = { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };

        const formData = new FormData();
        formData.append('blog_id', this.props.idBlog);
        formData.append('user_id', userData.id);
        formData.append('rate', value);
        
        CallApi('POST','blog/rate/' + this.props.id_blog, formData, headers)
          .then(response => {
              console.log(response)
              Notifications("Ratings successfully!", 'success')
          })
          .catch(error => {
              console.log(error)
          })
      }else{
        Notifications("Please login before ratings!", 'danger')
      }
      
    }

    render() {
      return (
        <div>
          <StarRatings
              rating={this.state.rating}
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension="20px"
              starSpacing="0"
              starRatedColor = 'rgb(254, 152, 15)'
              starEmptyColor = 'rgb(203, 211, 227)'	
              starHoverColor = 'rgb(254, 152, 15)'
          />
        </div>
      )
    }
}
export default Ratings;
















