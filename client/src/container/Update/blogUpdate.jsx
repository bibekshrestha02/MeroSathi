import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
// / /////////////{this.state.Body}Body ko banunu na baki xa /////////////////////
class blogUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Heading: "",
      subTitle: "",
      Body: [],
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
    const url = `/Blog/update/${id}`;
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
    Axios.get(`/Blog/${this.props.id}`)
      .then(result => result.data.idData)
      .then(e => {
        const { Heading, subTitle, Body } = e;

        this.setState({ Heading });
        this.setState({ subTitle });
        this.setState({ Body });
      });
  }
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
              value={this.state.subTitle}
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
                  <li key={e.Title}>
                    <div className='form-group'>
                      <input
                        type='Text'
                        className='form-control'
                        id=''
                        onChange
                        value={e.Title}
                        name='Body'
                        placeholder='Title'
                      />
                    </div>
                    <div className='form-group'>
                      <textarea
                        value={e.Description}
                        className='form-control'
                        rows='2'></textarea>
                    </div>
                  </li>
                );
              })}
            </ul>
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
