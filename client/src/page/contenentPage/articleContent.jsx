import React, { Component } from "react";
import BgImage from "./../../logo(MeroSathi)/Article.jpg";
import Image from "./../../container/bgImage";
import ContentPage from "./../../container/contentPage";
import { Redirect } from "react-router-dom";

export default class essayContent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Content: "Article",
      idData: [],
      related: [],
      error: false,
    };
  }
  componentDidMount() {
    fetch(`/Article/${this.props.id}`)
      .then(res => res.json())
      .then(e => {
        this.setState({
          loading: true,
          idData: e.idData,
          related: e.related,
        });
      })
      .catch(e => {
        this.setState({ error: true });
      });
  }

  render() {
    const { idData, related, Content } = this.state;
    if (this.state.error) {
      return (
        <Redirect
          to={{
            pathname: "/Article",
          }}
        />
      );
    }
    return (
      <>
        <Image BgImage={BgImage} />
        <ContentPage
          content={Content}
          Title={idData.Title}
          Head={idData.Head}
          Body={idData.Body}
          Related={related}
        />
      </>
    );
  }
}
