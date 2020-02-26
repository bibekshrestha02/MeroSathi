import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

import DefaultImg from "./../logo(MeroSathi)/defaultImg.jpeg";

const Example = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const data = JSON.parse(sessionStorage.getItem("userData"));

  const toggle = () => setPopoverOpen(!popoverOpen);
  const click = function() {
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <Button
        className='rounded-circle'
        color='light'
        id='Popover1'
        type='button'>
        <img src={DefaultImg} alt='img' width='25px' className='rounded' />
      </Button>

      <Popover
        placement='bottom'
        isOpen={popoverOpen}
        target='Popover1'
        toggle={toggle}>
        <PopoverHeader>
          {" "}
          {data.fname} {data.lname}
        </PopoverHeader>
        <PopoverBody>
          <button className='float-right mb-2' onClick={click}>
            Log out
          </button>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default Example;
