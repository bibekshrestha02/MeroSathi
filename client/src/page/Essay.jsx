import React, { Component } from "react";
import Image from "./../container/bgImage";
import BgImage from "./../logo(MeroSathi)/Eassy.jpg";
import Cards from "./../container/cards";
import CardsAdmin from "./../container/cardAdmin";

export default class essay extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      essay: [],
      content: "Essay",
    };
  }

  componentDidMount() {
    fetch("/Essay")
      .then(res => res.json())
      .then(essay => {
        this.setState({ loading: true });
        this.setState({ essay });
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
            ? this.state.essay.map(e => {
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
            : this.state.essay.map(e => {
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
