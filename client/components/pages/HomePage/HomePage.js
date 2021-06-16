import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import Title from "react-bulma-companion/lib/Title";
import SystemInfoList from "_organisms/SystemInfoList";
import { attemptGetSystemInformation } from "_thunks/systemInformations";

export default function HomePage() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetSystemInformation())
        .catch(R.identity)
        .then(() => setLoading(false));
    }
  }, []);

  return (
    !loading && (
      <div className="home-page page">
        <Section>
          <Container>
            <Title size="1">Home Page</Title>
            <SystemInfoList />
          </Container>
        </Section>
      </div>
    )
  );
}
