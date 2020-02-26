import React from "react";

export default function bgImage(props) {
  return (
    <div className=' bgImage img-fluid'>
      <img src={props.BgImage} className='img-fluid' alt='' />
    </div>
  );
}
