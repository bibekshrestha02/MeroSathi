import React from "react";

export default function cards(props) {
  let style = {
    height: "50px",
    overflow: "hidden",
    textoverflow: "ellipsis",
  };

  if (props.content === "Blog") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text'>{props.head}</p>
          <a
            href={"/BlogPage/" + props.id}
            className='card-link btn btn-warning float-right'>
            Read More
          </a>
        </div>
      </div>
    );
  } else if (props.content === "Article") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text'>{props.head}</p>
          <a
            href={"/ArticlePage/" + props.id}
            className='card-link btn btn-warning float-right'>
            Read More
          </a>
        </div>
      </div>
    );
  } else if (props.content === "Essay") {
    return (
      <div className='card bg-light'>
        <div className='card-body'>
          <h4 className='card-title'>{props.title}</h4>
          <hr />
          <p className='card-text' style={style}>
            {props.head}
          </p>
          <a
            href={"/EssayPage/" + props.id}
            className='card-link btn btn-warning float-right'>
            Read More
          </a>
        </div>
      </div>
    );
  }
}
