import React, { useState, useEffect, useRef } from 'react';
import { Button, Card } from 'react-bootstrap';

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
    </>
  );
};

export default Tutorial;
