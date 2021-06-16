import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";

import { attemptDeleteMachineKey } from "_thunks/machineKeys";
import ConfirmModal from "_organisms/ConfirmModal";

export default function MachineKey({ id, name, publicKey, createdAt }) {
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);

  const deleteMachineKey = () => {
    dispatch(attemptDeleteMachineKey(id));
    closeModal();
  };
  return (
    <li className="machineKey box">
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
