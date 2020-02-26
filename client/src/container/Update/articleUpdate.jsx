import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class blogUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: "",
      Head: "",
      Body: "",
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = async e => {
    e.preventDefault();
    const id = this.props.id;
    const data = this.state;
    const { token } = JSON.parse(sessionStorage.getItem("userData"));
    const Authorization = `Bearer ${token}`;
    const url = `/Article/update/${id}`;
    let result = await Axios.patch(url, data, {
      headers: {
        Authorization,
      },
    });
    if (result) {
      alert(`sucessfull Updated ${this.state.Title}`);
      window.location.reload();
      return <Redirect to='/' />;
    } else {
      console.log("something went wrong");
    }
  };
  componentDidMount() {
    Axios.get(`/Article/${this.props.id}`)
      .then(result => result.data.idData)
      .then(e => {
        const { Title, Head, Body } = e;
        this.setState({ Title });
        this.setState({ Head });
        this.setState({ Body });
      });
  }
  render() {
    return (
      <div className='container'>
        <h1 className='display-3 text-center'>Article</h1>
        <form onSubmit={this.submitHandler}>
          <div className='form-group'>
            <h4>Title</h4>
            <hr />
            <input
              type='Text'
              className='form-control'
              value={this.state.Title}
              name='Title'
              onChange={this.changeHandler}
              placeholder='Title'
              required
            />
          </div>
          <div className='form-group'>
            <h4>Head</h4>
            <hr />

            <textarea
              onChange={this.changeHandler}
              value={this.state.Head}
              name='Head'
              required
              className='form-control'
              rows='3'></textarea>
          </div>
          <div className='form-group'>
            <h4>Body</h4>
            <hr />
            <textarea
              onChange={this.changeHandler}
              value={this.state.Body}
              name='Body'
              className='form-control'
              required
              rows='3'></textarea>
          </div>
          <div className='row mb-3'>
            <div className='col'>
              <button>Back</button>
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
export default blogUpdate;
