import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Columns from "react-bulma-companion/lib/Columns";
import Column from "react-bulma-companion/lib/Column";
import Button from "react-bulma-companion/lib/Button";
import Input from "react-bulma-companion/lib/Input";

import { attemptAddMachineKey } from "_thunks/machineKeys";
import useKeyPress from "_hooks/useKeyPress";

export default function AddMachineKey() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  const handleAddMachineKey = () => {
    if (text) {
      dispatch(attemptAddMachineKey(name, key));
      setText("");
    }
  };

  useKeyPress("Enter", handleAddMachineKey);

  const updateName = (e) => setNme(e.target.value);
  const updateKey = (e) => setKey(e.target.value);

  return (
    <Columns className="add-machineKeys" gapless>
      <Column size="10">
        <Input value={name} onChange={updateName} />
        <Input value={key} onChange={updateKey} />
      </Column>
      <Column size="2">
        <Button color="success" onClick={handleAddMachineKey} fullwidth>
          Add
        </Button>
      </Column>
    </Columns>
  );
}
