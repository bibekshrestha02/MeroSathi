import React, { Component } from "react";
import BgImage from "./../../logo(MeroSathi)/Blog.jpg";
import Image from "./../../container/bgImage";
import ContentPage from "./../../container/contentPage";
import { Redirect } from "react-router-dom";
export default class essayContent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Content: "Blog",
      idData: [],
      body: [],
      related: [],
      error: false,
    };
  }
  componentDidMount() {
    fetch(`/Blog/${this.props.id}`)
      .then(res => res.json())
      .then(e => {
        this.setState({
          loading: true,
          idData: e.idData,
          body: e.idData.Body,
          related: e.related,
        });
      })
      .catch(e => {
        this.setState({ error: true });
      });
  }

  render() {
    const { idData, related, Content, body } = this.state;
    if (this.state.error) {
      return (
        <Redirect
          to={{
            pathname: "/Blog",
          }}
        />
      );
    }
    return (
      <>
        <Image BgImage={BgImage} />

        <ContentPage
          content={Content}
          Heading={idData.Heading}
          subTitle={idData.subTitle}
          Body={body}
          Related={related}
        />
      </>
    );
  }
}
