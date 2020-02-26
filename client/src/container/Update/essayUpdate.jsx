import React, { Component } from "react";
import Axios from "axios";

class EssayUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Title: "",
      Head: "",
      Body: "",
      Conclusion: "",
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
    const url = `/Essay/update/${id}`;
    let result = await Axios.patch(url, data, {
      headers: {
        Authorization,
      },
    });
    if (result) {
      alert(`sucessfull Updated ${this.state.Title}`);
      window.location.reload();
      this.props.history.push("/");
    } else {
      console.log("something went wrong");
    }
  };
  componentDidMount() {
    Axios.get(`/Essay/${this.props.id}`)
      .then(result => result.data.idData)
      .then(e => {
        const { Title, Head, Body, Conclusion } = e;
        this.setState({ Title });
        this.setState({ Head });
        this.setState({ Body });
        this.setState({ Conclusion });
      });
  }

  render() {
    return (
      <div className='container'>
        <h1 className='display-3 text-center'>Essay Update</h1>
        <form onSubmit={this.submitHandler}>
          <div className='form-group'>
            <h4>Title</h4>
            <hr />
            <input
              type='Text'
              className='form-control'
              id=''
              onChange={this.changeHandler}
              placeholder='Title'
              value={this.state.Title}
              required
              name='Title'
            />
          </div>
          <div className='form-group'>
            <h4>Head</h4>
            <hr />
            <textarea
              className='form-control'
              onChange={this.changeHandler}
              value={this.state.Head}
              name='Head'
              required
              rows='3'></textarea>
          </div>
          <div className='form-group'>
            <h4>Body</h4>
            <hr />
            <textarea
              className='form-control'
              onChange={this.changeHandler}
              value={this.state.Body}
              name='Body'
              required
              rows='3'></textarea>
          </div>
          <div className='form-group'>
            <h4>Conclusion</h4>
            <hr />
            <textarea
              onChange={this.changeHandler}
              value={this.state.Conclusion}
              className='form-control'
              name='Conclusion'
              required
              rows='3'></textarea>
          </div>
          <div className='row mb-3'>
            <div className='col'>
              <button onClick={console.log(window.location.pathname)}>
                Back
              </button>
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

export default EssayUpdate;
