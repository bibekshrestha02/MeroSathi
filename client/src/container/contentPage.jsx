import React from "react";
import ContentSide from "./contentSide";
import "./../css/style.css";
export default function contentPage(props) {
  if (props.content === "Essay") {
    return (
      <div className='row mt-3 mb-2 ml-4 mr-4 border'>
        <div className='col-lg-9 col-sm-12 col-md-12 bg-light  border'>
          <div className='p-4 page'>
            <p className='display-4 text-center heading'>{props.Title}</p>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.Head}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.Body}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.Conclusion}</div>
          </div>
        </div>
        <div className='col'>
          <h3 className='text-center'>Related</h3>
          {props.Related.map(e => {
            return <ContentSide key={e.Title} Head={e.Title} id={e._id} />;
          })}
        </div>
      </div>
    );
  } else if (props.content === "Article") {
    return (
      <div className='row mt-3 mb-2 ml-4 mr-4 border'>
        <div className='col-lg-9 col-sm-12 col-md-12 bg-light  border'>
          <div className='p-4 page'>
            <p className='display-4 text-center heading'>{props.Title}</p>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.Head}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.Body}</div>
          </div>
        </div>
        <div className='col ml-5 mb-5'>
          <h3 className='text-center'>Related</h3>
          {props.Related.map(e => {
            return <ContentSide key={e.Title} Head={e.Title} id={e._id} />;
          })}
        </div>
      </div>
    );
  } else if (props.content === "Blog") {
    return (
      <div className='row mt-3 mb-2 ml-4 mr-4 border'>
        <div className='col-lg-9 col-sm-12 col-md-12 bg-light  border'>
          <div className='p-4 page'>
            <p className='display-4 text-center heading'>{props.Heading}</p>
            <div>{props.subTitle}</div>
            <ul>
              {props.Body.map(e => {
                return (
                  <li key={e.Title}>
                    <div>
                      <span className='display-5 '>
                        <b>
                          <u>{e.Title}:</u>
                        </b>
                      </span>
                      <div>{e.Description}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className='col ml-5 mb-5'>
          <h3 className='text-center'>Related</h3>
          {props.Related.map(e => {
            return <ContentSide key={e.Title} Head={e.Heading} id={e._id} />;
          })}
        </div>
      </div>
    );
  }
}
