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
        Machines key:
      </Title>
      <Columns>
        <Column size="8" offset="2" className="has-text-centered">
          <AddMachineKey />
        </Column>
      </Columns>
      <Columns>
        <Column size="8" offset="2" className="has-text-left">
          <MachineKeyList />
        </Column>
      </Columns>
    </Section>
  );
}
