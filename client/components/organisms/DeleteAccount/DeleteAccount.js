import Box from "react-bulma-companion/lib/Box";
import Title from "react-bulma-companion/lib/Title";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { attemptDeleteUser } from "_thunks/user";
import ConfirmModal from "_organisms/ConfirmModal";
import Button from "react-bulma-companion/lib/Button";

export default function DeleteAccount() {
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState(false);
  const closeModal = () => setConfirm(false);

  const deleteUser = () => {
    alert("assad");
    // if (usernameCase.toLowerCase() === user.username) {
    //   const updatedUser = { username_case: usernameCase };
    //   dispatch(attemptUpdateUser(updatedUser)).catch(() =>
    //     setUsernameCase(user.usernameCase)
    //   );
    // }
  };

  return (
    <Box className="delete-account">
      <Title size="3">Delete Account</Title>
      <hr className="separator" />
      <Button color="danger" disabled={false} onClick={() => setConfirm(true)}>
        Delete
      </Button>

      <ConfirmModal
        confirm={confirm}
        onCancel={closeModal}
        onTrue={deleteUser}
        text={"Do you really wish to delete your account?"}
      />
    </Box>
  );
}
