import React, { useState } from "react";
import { Button, Modal, ButtonToolbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import SignUp from "./signUp";
function MyVerticallyCenteredModal(props) {
  const [page, setPage] = useState("login");
  const pageStateChanger = state => {
    setPage(state);
  };
  if (page === "login") {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login state={pageStateChanger} />
          {/* <SignUp /> */}
        </Modal.Body>
      </Modal>
    );
  } else if (page === "signUp") {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUp state={pageStateChanger} />
        </Modal.Body>
      </Modal>
    );
  }
}

function Btn() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <ButtonToolbar>
      <Button
        variant='warning'
        onClick={() => setModalShow(true)}
        className='login btn-lg li btn-sm btn-warning nav-link text-center'>
        Login
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}
export default Btn;
