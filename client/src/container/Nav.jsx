import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./../css/style.css";
import Logo from "./../logo(MeroSathi)/logo.png";
import ModalBtn from "./modalbtn";
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [
        {
          id: 0,
          name: "Home",
          link: "/",
          className: "li nav-link",
        },
        {
          id: 1,
          name: "Essay",
          link: "/Essay",
          className: "li nav-link",
        },
        {
          id: 2,
          name: "Article",
          link: "/Article",
          className: "li nav-link",
        },
        {
          id: 3,
          name: "Blog",
          link: "/Blog",
          className: "li nav-link",
        },
        {
          id: 4,
          name: "AboutUs",
          link: "/About",
          className: "li nav-link",
        },
      ],
      navToogle: {
        navbarState: false,
        navbarClass: "collapse navbar-collapse",
      },
    };
  }
  // for menu toogler
  myToogler = () => {
    if (this.state.navToogle.navbarState) {
      this.setState({
        navToogle: {
          navbarState: false,
          navbarClass: "collapse navbar-collapse",
        },
      });
    } else {
      this.setState({
        navToogle: {
          navbarState: true,
          navbarClass: "collapse navbar-collapse show",
        },
      });
    }
  };

  render() {
    return (
      <>
        <nav className='navbar Nav navbar-expand-sm bg-primary navbar-light'>
          <Link to='/' className='navbar-brand'>
            <img src={Logo} alt='logo' className='navImage' width='200px' />
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#collapsibleNavbar'
            onClick={this.myToogler}>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div
            className={this.state.navToogle.navbarClass}
            id='collapsibleNavbar'>
            <ul className='navbar-nav ml-auto'>
              {this.state.nav.map(e => (
                <li key={e.id} className='nav-item'>
                  <Link to={e.link} key={e.id} className={e.className}>
                    {e.name}
                  </Link>
                </li>
              ))}
              <div className='nav-item'>
                <ModalBtn />
              </div>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Nav;
