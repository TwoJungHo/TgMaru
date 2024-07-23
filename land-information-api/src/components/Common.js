import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function CustomAlert(show, title, message) {
  return (
    <Modal show={show} >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary">
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}