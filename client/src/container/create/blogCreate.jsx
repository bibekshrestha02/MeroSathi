import React, { Component } from "react";
import Axios from "axios";

export default class blogCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Heading: "",
      subTitle: "",
      Body: [{}],
    };
  }
  // input value changer
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // onSubmit Form
  submitHandler = async e => {
    e.preventDefault();
    const data = this.state;
    const { token } = JSON.parse(sessionStorage.getItem("userData"));
    const Authorization = `Bearer ${token}`;
    const url = "/Blog/create";
    let result = await Axios.post(url, data, {
      headers: {
        Authorization,
      },
    });
    if (result) {
      alert("sucessfull created Blog");
      window.location.reload();
    } else {
      console.log("something went wrong");
    }
  };
  //  adding body field
  onClickBody = e => {
    e.preventDefault();
    const push = this.state.Body.concat({});
    this.setState({ Body: [...this.state.Body, push] });
  };
  // removing body field
  onClickBodyDelete = e => {
    e.preventDefault();
    const length = this.state.Body.length;
    const pop = this.state.Body.slice(length, 1);
    this.setState({ Body: [pop] });
  };

  render() {
    return (
      <div className='container'>
        <h1 className='display-3 text-center'>Blog</h1>
        <form onSubmit={this.submitHandler}>
          <div className='form-group'>
            <h4>Heading</h4>
            <hr />
            <input
              type='Text'
              className='form-control'
              id=''
              name='Heading'
              onChange={this.changeHandler}
              placeholder='Heading'
              value={this.state.Heading}
            />
          </div>
          <div className='form-group'>
            <h4>Sub-Title</h4>
            <hr />
            <textarea
              value={this.state.SubTitle}
              onChange={this.changeHandler}
              name='subTitle'
              className='form-control'
              rows='3'></textarea>
          </div>
          <div className='form-group'>
            <h4>Body</h4>
            <ul>
              <hr />
              {this.state.Body.map(e => {
                return (
                  <li>
                    <div className='form-group'>
                      <input
                        type='Text'
                        className='form-control'
                        id=''
                        name='Body'
                        placeholder='Title'
                      />
                    </div>
                    <div className='form-group'>
                      <textarea className='form-control' rows='2'></textarea>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button onClick={this.onClickBody}>Add Body</button>
            <button onClick={this.onClickBodyDelete}>Body Delete</button>
          </div>

          <div className='row mb-3'>
            <div className='col'>
              <button onClick={this.props.back}>Back</button>
            </div>
            <div className='col text-right'>
              <input type='submit' value='Submit' />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
