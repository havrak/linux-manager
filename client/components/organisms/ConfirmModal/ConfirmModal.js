import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bulma-companion/lib/Modal";
import Card from "react-bulma-companion/lib/Card";
import Content from "react-bulma-companion/lib/Content";

export default function ConfirmModal({ confirm, onCancel, onTrue, text }) {
  return (
    <Modal className="confirm-modal" active={confirm}>
      <Modal.Background />
      <Modal.Content>
        <Card>
          <Card.Content>
            <Content className="has-text-centered">{text}</Content>
          </Card.Content>
          <Card.Footer>
            <Card.FooterItem onClick={onCancel} onKeyPress={onCancel}>
              Cancel
            </Card.FooterItem>
            <Card.FooterItem onClick={onTrue} onKeyPress={onTrue}>
              Delete
            </Card.FooterItem>
          </Card.Footer>
        </Card>
      </Modal.Content>
      <Modal.Close size="large" aria-label="close" onClick={onCancel} />
    </Modal>
  );
}

ConfirmModal.propTypes = {
  confirm: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onTrue: PropTypes.func.isRequired,
};
