import React, { Component } from "react";
import axios from "axios";
export default class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: false,
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = async e => {
    e.preventDefault();
    const user = this.state;
    try {
      const result = await axios.post("/user/logIn", user);
      // console.log(result);

      const { login, role } = result.data;
      if (login) {
        sessionStorage.setItem("userData", JSON.stringify(result.data));
        sessionStorage.setItem("logIn", JSON.stringify({ login, role }));
        window.location.reload();
      }
    } catch (error) {
      // console.log(error);
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div className='form-group'>
          {this.state.error === true ? (
            <p className='text-center text-danger'>
              <span className='glyphicon glyphicon-alert'></span>
              Invalid Email or Password!
            </p>
          ) : (
            <span></span>
          )}
          <label>Email address</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            name='email'
            value={this.state.email}
            onChange={this.changeHandler}
            aria-describedby='emailHelp'
            placeholder='Enter email'
            required
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={this.state.password}
            onChange={this.changeHandler}
            name='password'
            className='form-control'
            id='exampleInputPassword1'
            placeholder='Password'
            required
          />
        </div>
        <div className='row '>
          <div className='col '>
            <p onClick={() => this.props.state("signUp")} className=' link'>
              Create an account
            </p>
          </div>
          <div className='col text-right '>
            <button type='submit' className='btn btn-outline-primary'>
              Login
            </button>
          </div>
        </div>
      </form>
    );
  }
}
