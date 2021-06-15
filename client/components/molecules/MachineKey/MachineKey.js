import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { parseISO, formatDistanceToNow } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
//import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
//import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
//import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
//import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
//import { faCheckSquare } from "@fortawesome/free-regular-svg-icons/faCheckSquare";

import { attemptDeleteMachineKey } from "_thunks/machineKeys";
import ConfirmModal from "_organisms/ConfirmModal";

//const fromNow = (date) =>
//  formatDistanceToNow(parseISO(date), { addSuffix: true });

export default function MachineKey({ id, name, publicKey, createdAt }) {
  const dispatch = useDispatch();
  console.log(publicKey);
  // const [name, setName] = useState(name);
  // const [key, setKey] = useState(key);
  //setUpdatedMessage(updatedAt ? fromNow(updatedAt) : "");
  const [confirm, setConfirm] = useState(false);
  //const [createdMessage, setCreatedMessage] = useState("");

  //const updateMessages = () => {
  //  setCreatedMessage(fromNow(createdAt));
  //};

  //useEffect(() => {
  //  updateMessages();
  //  const interval = window.setInterval(updateMessages, 1000);

  //  return () => clearInterval(interval);
  //});

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const deleteMachineKey = () => {
    dispatch(attemptDeleteMachineKey(id));
    closeModal();
  };
  return (
    <li className="todo box">
      <article className="media">
        <figure className="media-left"></figure>
        <div className="media-content">
          <div className="content">
            <p>
              <small>{`created ${createdAt}`}</small>
            </p>
            <h5>{name}</h5>
            <p>{publicKey}</p>
          </div>

          <nav className="level is-mobile">
            <div className="level-left"></div>
            <div className="level-right">
              <span className="icon" onClick={openModal} onKeyPress={openModal}>
                <FontAwesomeIcon icon={faTrashAlt} size="lg" />
              </span>
            </div>
          </nav>
        </div>
      </article>
      <ConfirmModal
        confirm={confirm}
        onCancel={closeModal}
        onTrue={deleteMachineKey}
        text={"Are you sure you want to delete this public key?"}
      />
    </li>
  );
}

MachineKey.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  publicKey: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};
