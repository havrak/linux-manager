import React from "react";

import Footer from "react-bulma-companion/lib/Footer";
import Container from "react-bulma-companion/lib/Container";
import Content from "react-bulma-companion/lib/Content";

export default function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <Footer>
      <Container>
        <Content className="has-text-centered">
          <p>{`Copyright Ⓒ ${year} Linux Manager`}</p>
          <p className="credits">
            {`Made by Kryštof Havránek, originally based on `}
            <a href="https://github.com/djizco/mern-boilerplate">
              Mern Manager
            </a>
          </p>
        </Content>
      </Container>
    </Footer>
  );
}
