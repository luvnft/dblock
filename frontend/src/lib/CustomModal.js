import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CustomModal = ({ show, title, message, onClose, code }) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-uppercase font-weight-bold">{message}</p>
            </Modal.Body>
            <Modal.Body>
                <div className=" font-weight-bold ">
                    <p>
                        Your Code :-
                    </p>
                    <p style={{ color: "blue" }}>
                        {code}
                    </p>

                    <p>Visit this site to redeem  :- https://www.dcodeblock.com</p>

                </div>
            </Modal.Body>

            {
                title === "Error" ? (<>
                    <Modal.Footer>
                        <Button variant="primary" onClick={onClose}>OK</Button>
                    </Modal.Footer>
                </>) : (<>
                    <Modal.Footer>
                        <Button variant="primary" onClick={onClose}>OK</Button>
                    </Modal.Footer>
                </>)
            }

        </Modal>
    );
};

export default CustomModal;
