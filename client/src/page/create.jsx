import React, { Component } from "react";
import ArticleCreate from "./../container/create/articleCreate";
import BlogCreate from "./../container/create/blogCreate";
import EssayCreate from "./../container/create/essayCreate";

export default class create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "Blog",
      link: "Create",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const value = this.state.value;
    this.setState({ link: value });
  }
  onClickBack = () => {
    this.setState({ link: "Create" });
  };
  render() {
    const { link } = this.state;
    if (link === "Article") {
      return <ArticleCreate back={this.onClickBack} />;
    } else if (link === "Blog") {
      return <BlogCreate back={this.onClickBack} />;
    } else if (link === "Essay") {
      return <EssayCreate back={this.onClickBack} />;
    }
    return (
      <div className='border  ml-4 mr-4'>
        <div className='createPage'>
          <h1 className='text-center display-3'>What you wanna a create</h1>
          <br />
          <form onSubmit={this.handleSubmit}>
            <select
              value={this.state.value}
              className='form-control mb-4'
              onChange={this.handleChange}>
              <option value='Blog'>Blog</option>
              <option value='Article'>Article</option>
              <option value='Essay'>Essay</option>
            </select>
            <input
              type='submit'
              className='btn btn-danger btn-block mb-2'
              value='Submit'
            />
          </form>
        </div>
      </div>
    );
  }
}
