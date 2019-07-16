import React, { useState } from "react";
import styled from "styled-components";
import { useWindowDimension } from "./components/layout/useWindowDimension";
import { Flex } from "./components/layout";

const MainContent = styled(Flex)`
  background-color: #2a2a2e;
  height: 100%;
  min-height: calc(100vh - 60px);
  width: 100%;
`;

function Layout({ Header, Main, MobileMenu, ...props }) {
  const { width, height } = useWindowDimension();
  const [menuOpen, toggleMenu] = useState(false);

  let screenSize;
  if (width > 900) {
    if (menuOpen) {
      toggleMenu(false);
    }
    screenSize = "desktop";
  } else {
    screenSize = "mobile";
  }

  return (
    <>
      <Header
        toggleMenu={() => {
          toggleMenu(!menuOpen);
        }}
        screenSize={screenSize}
      />
      {menuOpen && screenSize == "mobile" ? (
        <MainContent>
          <MobileMenu open={menuOpen} screenSize={screenSize} />
        </MainContent>
      ) : (
        <MainContent>
          <Main screenSize={width} />
        </MainContent>
      )}
    </>
  );
}

export default Layout;
