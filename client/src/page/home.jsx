import React, { Component } from "react";
import Image from "./../container/bgImage";
import BgImage from "./../logo(MeroSathi)/Home.jpg";
import Cards from "./../container/homeCard";
import HomeTitle from "./../container/homeTitle";
export default class home extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      Essay: [],
      Article: [],
      Blog: [],
    };
  }
  componentDidMount() {
    fetch("/Home")
      .then(res => res.json())
      .then(e => {
        console.log(e);
        this.setState({
          loading: true,
          Essay: e.dataEssay,
          Article: e.dataArticle,
          Blog: e.dataBlog,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    // const { dataBlog, dataEssay, dataArticle } = this.state.Home;

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
        <HomeTitle title='Essay' />
        <div className='row ml-3 mr-3 mt-1 border'>
          {this.state.Essay.map(e => {
            return (
              <div key={e._id} className=' mb-2 ml-2 mr-2 '>
                <Cards id={"/Essay/" + e._id} head={e.Head} title={e.Title} />
              </div>
            );
          })}
        </div>
        <HomeTitle title='Blog' />
        <div className='row ml-3 mr-3 mt-1'>
          {this.state.Blog.map(e => {
            return (
              <div key={e._id} className='mb-2 ml-2 mr-2 '>
                <Cards
                  id={"/Blog/" + e._id}
                  head={e.subTitle}
                  title={e.Heading}
                />
              </div>
            );
          })}
        </div>
        <HomeTitle title='Article' />
        <div className='row  ml-3 mr-3 mt-1 border'>
          {this.state.Article.map(e => {
            return (
              <div key={e._id} className='mb-2 ml-2 mr-2 mb-2'>
                <Cards id={"/Article/" + e._id} head={e.Head} title={e.Title} />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
