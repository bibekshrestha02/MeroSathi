import React, { Component } from "react";
import axios from "axios";
import Auth from "./../utils/authControl";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      passwordConform: "",
      error: {
        email: false,
        password: false,
        empty: false,
      },
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = async e => {
    try {
      e.preventDefault();
      const user = this.state;
      const result = await axios.post(`/user/signUp`, user);
      let data = result.data;
      if (data.login) {
        sessionStorage.setItem("userData", JSON.stringify(data));
        sessionStorage.setItem("logIn", true);
        Auth.login();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const { fname, lname, email, password, passwordConform } = this.state;
    return (
      <form onSubmit={this.submitHandler}>
        <div className='row'>
          <div className='col-xs-6 col-sm-6 col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                name='fname'
                id='first_name'
                value={fname}
                className='form-control input-sm'
                placeholder='First Name'
                onChange={this.changeHandler}
              />
            </div>
          </div>
          <div className='col-xs-6 col-sm-6 col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                name='lname'
                id='last_name'
                value={lname}
                className='form-control input-sm'
                placeholder='Last Name'
                onChange={this.changeHandler}
              />
            </div>
          </div>
        </div>

        <div className='form-group'>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            className='form-control input-sm'
            placeholder='Email Address'
            onChange={this.changeHandler}
          />
        </div>

        <div className='row'>
          <div className='col-xs-6 col-sm-6 col-md-6'>
            <div className='form-group'>
              <input
                type='password'
                name='password'
                id='password'
                onChange={this.changeHandler}
                value={password}
                className='form-control input-sm'
                placeholder='Password'
              />
            </div>
          </div>
          <div className='col-xs-6 col-sm-6 col-md-6'>
            <div className='form-group'>
              <input
                type='password'
                name='passwordConform'
                id='password_confirmation'
                value={passwordConform}
                className='form-control input-sm'
                placeholder='Confirm Password'
                onChange={this.changeHandler}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col'>
            <p className='link' onClick={() => this.props.state("login")}>
              SignIn your account
            </p>
          </div>
          <div className='col text-right'>
            <input type='submit' value='Register' className='btn btn-info' />
          </div>
        </div>
      </form>
    );
  }
}
