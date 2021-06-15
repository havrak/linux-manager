import React from "react";
import AddMachineKey from "_molecules/AddMachineKey";
import MachineKeyList from "_organisms/MachineKeyList";

import Section from "react-bulma-companion/lib/Section";
import Title from "react-bulma-companion/lib/Title";
import Columns from "react-bulma-companion/lib/Columns";
import Column from "react-bulma-companion/lib/Column";

export default function MachineKeySection() {
  return (
    <Section className="machineKey-section">
      <Title size="1" className="has-text-centered">
        Add new machine key:
      </Title>
      <p className="machineKey-notice">
        {" "}
        Firstly download collector program with button bellow. After executing
        it you will get a key that is supposed to be placed in key text field.
      </p>
      <Columns>
        <Column size="8" offset="2" className="has-text-centered">
          <AddMachineKey />
        </Column>
      </Columns>
      <Title size="1" className="has-text-centered">
        Machines key:
      </Title>
      <Columns>
        <Column size="8" offset="2" className="has-text-left">
          <MachineKeyList />
        </Column>
      </Columns>
    </Section>
  );
}
