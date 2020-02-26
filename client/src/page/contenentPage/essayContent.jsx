import React, { Component } from "react";
import BgImage from "./../../logo(MeroSathi)/Eassy.jpg";
import Image from "./../../container/bgImage";
import ContentPage from "./../../container/contentPage";
import { Redirect } from "react-router-dom";
export default class essayContent extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Content: "Essay",
      idData: [],
      related: [],
      error: false,
    };
  }
  componentDidMount() {
    fetch(`/Essay/${this.props.id}`)
      .then(res => res.json())
      .then(e => {
        this.setState({
          loading: true,
          idData: e.idData,
          related: e.related,
        });
      })
      .catch(e => {
        console.log(e);
        return this.setState({ error: true });
      });
  }

  render() {
    const { idData, related, Content } = this.state;
    if (this.state.error) {
      return (
        <Redirect
          to={{
            pathname: "/Essay",
          }}
        />
      );
    }
    return (
      <>
        <Image BgImage={BgImage} />
        {/* {console.log(related)} */}
        <ContentPage
          Title={idData.Title}
          content={Content}
          Head={idData.Head}
          Body={idData.Body}
          Conclusion={idData.Conclusion}
          Related={related}
        />
      </>
    );
  }
}
