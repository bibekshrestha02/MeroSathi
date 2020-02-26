import React from "react";
import "./../css/style.css";
export default function homeTitle(props) {
  return (
    <div>
      <div className='ml-4 mr-4 mt-1'>
        <p className='homeTitle'>{props.title}</p>
        <hr />
      </div>
    </div>
  );
}
