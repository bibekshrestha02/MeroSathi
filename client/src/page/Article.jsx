import React, { Component } from "react";
import Image from "./../container/bgImage";
import BgImage from "./../logo(MeroSathi)/Article.jpg";
import Cards from "./../container/cards";
import CardsAdmin from "./../container/cardAdmin";

export default class Article extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Article: [],
      content: "Article",
    };
  }

  componentDidMount() {
    fetch("/Article")
      .then(res => res.json())
      .then(Article => {
        this.setState({ loading: true });
        this.setState({ Article });
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
            ? this.state.Article.map(e => {
                return (
                  <div key={e._id} className='col-12 mb-2'>
                    <CardsAdmin
                      id={e._id}
                      head={e.Head}
                      content={this.state.content}
                      title={e.Title}
                    />
                  </div>
                );
              })
            : this.state.Article.map(e => {
                return (
                  <div key={e._id} className='col-12 mb-2'>
                    <Cards
                      id={e._id}
                      head={e.Head}
                      content={this.state.content}
                      title={e.Title}
                    />
                  </div>
                );
              })}
        </div>
      </>
    );
  }
}
