import React, { Component } from "react";
import Image from "./../container/bgImage";
import Cards from "./../container/cards";
import CardsAdmin from "./../container/cardAdmin";
import BgImage from "./../logo(MeroSathi)/Blog.jpg";
export default class Blog extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Blog: [],
      content: "Blog",
    };
  }

  componentDidMount() {
    fetch("/Blog")
      .then(res => res.json())
      .then(Blog => {
        this.setState({ loading: true });

        this.setState({ Blog });
      });
  }

  render() {
    if (!this.state.loading) {
      return (
        <>
          <Image BgImage={BgImage} />
          <h1 className='display-3 text-center'>Loading.......</h1>
        </>
      );
    }
    return (
      <>
        <Image BgImage={BgImage} />
        <div className='row ml-3 mr-3 mt-1'>
          {JSON.parse(sessionStorage.getItem("logIn")) &&
          JSON.parse(sessionStorage.getItem("logIn")).role === "admin"
            ? this.state.Blog.map(e => {
                return (
                  <div key={e._id} className='col-12 mb-2'>
                    <CardsAdmin
                      id={e._id}
                      title={e.Heading}
                      content={this.state.content}
                      head={e.subTitle}
                    />
                  </div>
                );
              })
            : this.state.Blog.map(e => {
                return (
                  <div key={e._id} className='col-12 mb-2'>
                    <Cards
                      id={e._id}
                      title={e.Heading}
                      content={this.state.content}
                      head={e.subTitle}
                    />
                  </div>
                );
              })}
        </div>
      </>
    );
  }
}
