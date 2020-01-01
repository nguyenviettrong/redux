import React from 'react';
import './Custom.css'
import HeaderTop from './components/Layout/Header/HeaderTop';
import HeaderMiddle from './components/Layout/Header/HeaderMiddle';
import HeaderBottom from './components/Layout/Header/HeaderBottom';
import Footer from './components/Layout/Footer';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import AppProvider  from './components/AppContext'
import {
  withRouter
} from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <AppProvider>
        <div>
          <header id="header">
              <HeaderTop />
              <HeaderMiddle />
              <HeaderBottom />
              <ReactNotification />
            </header>
            {this.props.children}
            <Footer />
        </div>
      </AppProvider>
    );
  }
}
export default withRouter(App);
