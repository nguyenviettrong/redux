import React from 'react'
import { withRouter} from 'react-router-dom';
export const AppContext = React.createContext()
export const AppConsumer = AppContext.Consumer

class AppProvider extends React.Component {
    constructor(props){
      super(props)
      let cart = []
      let wishlist = []
      if(localStorage["appState"] !== undefined) {
        cart = JSON.parse(localStorage.getItem('appState')).cart
        wishlist = JSON.parse(localStorage.getItem('appState')).wishlist
      }
      this.state = {
        cart: cart,
        wishlist: wishlist
      }
    }

    logoutContext = (value) => {
      this.setState({
        cart: [],
        wishlist: []
      })
      localStorage.clear();
      this.props.history.push('/login')
    }

    handleAddCart = (product) => {
      let {cart} = this.state
      let index = -1;
      if (cart.length > 0) {
        for ( var i = 0; i < cart.length; i++) {
          if (product.id === cart[i].id) {
            index = product.id
          }
        }      
      }

      if (index === -1) {
        product.quantity = 1
        cart.push(product)
        this.setState({
          cart:cart
        })
      }else{
        let objIndex = cart.findIndex((obj => obj.id === index))
        cart[objIndex].quantity++
        this.setState({
          cart:cart
        })
      }
      
      var appState = JSON.parse(localStorage.getItem('appState'))
      if (appState !== null) {
        appState.cart = cart
        localStorage["appState"] = JSON.stringify(appState);
      }

    }

    handleRemoveItemCart = (id) => {
      let {cart} = this.state
      let objIndex = cart.findIndex((obj => obj.id === id))
      cart.splice(objIndex, 1);
      this.setState({
        cart:cart
      })
      var appState = JSON.parse(localStorage.getItem('appState'))
      if (appState !== null) {
        appState.cart = cart
        localStorage["appState"] = JSON.stringify(appState);
      }
    }

    handleIncreaseItemCart = (id) => {
      let {cart} = this.state
      let objIndex = cart.findIndex((obj => obj.id === id))
      cart[objIndex].quantity++
      this.setState({
        cart:cart
      })
      var appState = JSON.parse(localStorage.getItem('appState'))
      if (appState !== null) {
        appState.cart = cart
        localStorage["appState"] = JSON.stringify(appState);
      }
    }

    handleDecreaseItemCart = (id) => {
      let {cart} = this.state
      let objIndex = cart.findIndex((obj => obj.id === id))
      // cart[objIndex].quantity > 1 ? cart[objIndex].quantity-- : 1
      if(cart[objIndex].quantity > 1){
        cart[objIndex].quantity--
      }else{
        cart[objIndex].quantity = 1
      }
      this.setState({
        cart:cart
      })
      var appState = JSON.parse(localStorage.getItem('appState'))
      if (appState !== null) {
        appState.cart = cart
        localStorage["appState"] = JSON.stringify(appState);
      }
    }

    toggleWishlist = (product) => {
      // console.log(product.id)
      let {wishlist} = this.state
      let index = -1;
      if (wishlist.length > 0) {
        for ( var i = 0; i < wishlist.length; i++) {
          if (product.id === wishlist[i].id) {
            index = product.id
          }
        }      
      }

      if (index === -1) {
        // product.quantity = 1
        wishlist.push(product)
        this.setState({
          wishlist:wishlist
        })
      }else{
        let objIndex = wishlist.findIndex((obj => obj.id === index))
        // wishlist[objIndex].quantity++
        wishlist.splice(objIndex, 1);
        this.setState({
          wishlist:wishlist
        })
      }
      
      var appState = JSON.parse(localStorage.getItem('appState'))
      if (appState !== null) {
        appState.wishlist = wishlist
        localStorage["appState"] = JSON.stringify(appState);
      }
      
    }

    render() {
      // console.log(this.state.cart)
      // console.log("App context localstorage: " , JSON.parse(localStorage.getItem('appState')).wishlist)
      return (
        <AppContext.Provider value={{
            state: this.state,
            handleAddCart:this.handleAddCart,
            handleRemoveItemCart: this.handleRemoveItemCart,
            handleIncreaseItemCart: this.handleIncreaseItemCart,
            handleDecreaseItemCart: this.handleDecreaseItemCart,
            toggleWishlist:this.toggleWishlist,
            loginContext: this.loginContext,
            logoutContext: this.logoutContext,
          }}
        >
          {this.props.children}
        </AppContext.Provider>
      );
    }
  }
  export default withRouter(AppProvider);
