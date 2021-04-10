import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Button,
  Overlay,
  Popover,
  Card,
  Carousel,
} from 'react-bootstrap';

const Tutorial = () => {
  const [show, setShow] = useState(false);

  const handleClick = (event) => {
    setShow(!show);
  };

  return (
    <>
      <div className='w-75 mx-auto'>
        <Button onClick={handleClick} className='mt-2'>
          Launch Tutorial
        </Button>

        {show && (
          <Card className='mt-2'>
            <Card.Title className='mt-2'>Steps</Card.Title>
            <Card.Body className='pb-0'>
              1. Go to Balance tab to transfer cash to your account
            </Card.Body>
            <Card.Body className='pb-0'>
              2. Search stock using the Search bar on the top
            </Card.Body>
            <Card.Body>3. Have fun investing!</Card.Body>
          </Card>
        )}
      </div>
      {/* <Button variant='primary' onClick={handleShow}>
        Launch Tutorial
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary'>Close</Button>
            <Button variant='primary'>Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal> */}
    </>
  );
};

export default Tutorial;
