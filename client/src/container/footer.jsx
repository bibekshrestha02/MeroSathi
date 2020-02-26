import React, { Component } from "react";
import "./../css/style.css";
import Logo from "./../logo(MeroSathi)/logo.png";
class Footer extends Component {
  render() {
    return (
      <footer className='footer page-footer font-small blue pt-4'>
        <div className='footer-copyright text-center text-white py-3'>
          © 2020 Copyright:
          <img src={Logo} alt='Logo' width='124px' />
        </div>
      </footer>
    );
  }
}

export default Footer;
