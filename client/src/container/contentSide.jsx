import React from "react";
export default function contentSide(props) {
  return (
    <div key={props.id}>
      <a className=' btn btn-outline-dark btn-block m-2' href={props.id}>
        {props.Head}
      </a>
    </div>
  );
}
