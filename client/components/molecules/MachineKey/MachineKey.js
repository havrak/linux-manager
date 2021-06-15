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

const fromNow = (date) =>
  formatDistanceToNow(parseISO(date), { addSuffix: true });

export default function MachineKey({ id, name, key, createdAt }) {
  const dispatch = useDispatch();

  // const [name, setName] = useState(name);
  // const [key, setKey] = useState(key);
  const [confirm, setConfirm] = useState(false);
  const [createdMessage, setCreatedMessage] = useState("");

  const updateMessages = () => {
    setUpdatedMessage(updatedAt ? fromNow(updatedAt) : "");
    setCreatedMessage(fromNow(createdAt));
  };

  useEffect(() => {
    updateMessages();
    const interval = window.setInterval(updateMessages, 1000);

    return () => clearInterval(interval);
  }, [updatedAt]);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const deleteMachineKey = () => dispatch(attemptDeleteMachineKey(id));

  return (
    <li className="todo box">
      <article className="media">
        <figure className="media-left"></figure>
        <div className="media-content">
          <div className="content">
            <p>
              <small>{`created ${createdMessage}`}</small>
            </p>
            <p>{key}</p>
            <p>{name}</p>
          </div>

          <nav className="level is-mobile">
            <div className="level-left">
              {!!updatedAt && <small>{`edited ${updatedMessage}`}</small>}
            </div>
            <div className="level-right">
              <span
                className="icon"
                onClick={openModal}
                onKeyPress={cancelEdit}
              >
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

Todo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

// Todo.defaultProps = {
//   updatedAt: null,
// };
