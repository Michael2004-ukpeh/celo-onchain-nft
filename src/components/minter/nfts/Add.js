import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { uploadFileToWebStorage } from "../../../utils/minter";

const TITLE = ["Warrior"];
const AddNfts = ({ save, address }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [show, setShow] = useState(false); // check if all form data has been filled

  // close the popup modal
  const handleClose = () => {
    setShow(false);
    setAttributes([]);
  };

  // display the popup modal
  const handleShow = () => setShow(true);

  // add an attribute to an NFT
  const setAttributesFunc = (e, trait_type) => {
    const { value } = e.target;
    const attributeObject = {
      trait_type,
      value,
    };
    const arr = attributes;

    // check if attribute already exists
    const index = arr.findIndex((el) => el.trait_type === trait_type);

    if (index >= 0) {
      // update the existing attribute
      arr[index] = {
        trait_type,
        value,
      };
      setAttributes(arr);
      return;
    }

    // add a new attribute
    setAttributes((oldArray) => [...oldArray, attributeObject]);
  };
  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
        shows
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create NFT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="inputLocation"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name of NFT"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>          

            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "shape");
              }}
              placeholder="NFT Title"
            >
              <option hidden>Title</option>
              {TITLE.map((title) => (
                <option
                  key={`title-${title.toLowerCase()}`}
                  value={title.toLowerCase()}
                >
                  {title}
                </option>
              ))}
            </Form.Control>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            onClick={() => {
              save({
                name,
                description,
                ownerAddress: address,
                attributes,
              });
              handleClose();
            }}
          >
            Create NFT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
AddNfts.propTypes = {
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;
