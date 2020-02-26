import React from "react";
import "./../css/style.css";
export default function cards(props) {
  let style = {
    height: "100px",
    overflow: "hidden",
  };
  return (
    <div className='card bg-light homeCards' style={{ width: "350px" }}>
      <div className='card-body'>
        <p className='card-title text-truncate'>
          <b>{props.title}</b>
        </p>
        <hr />
        <p className='card-text' style={style}>
          {props.head}
        </p>
        <a href={props.id} className='btn btn-warning float-right'>
          Read More
        </a>
      </div>
    </div>
  );
}
