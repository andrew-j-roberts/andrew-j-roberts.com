import React, { useState } from "react";
import Header from "./Header";
import { useWindowDimension } from "./components/Layout/useWindowDimension";
import { Flex } from "./components/Layout";

function Layout({ Header, Main, Sidebar, ...props }) {
  const { width, height } = useWindowDimension();
  const { sidebarOpen, toggleSidebar } = useState(false);

  let screenSize;
  if (width > 900) {
    screenSize = "desktop";
  } else {
    screenSize = "mobile";
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} screenSize={screenSize} />
      {sidebarOpen && screenSize == "mobile" ? (
        <Flex>
          <Sidebar open={sidebarOpen} screenSize={screenSize} />
        </Flex>
      ) : (
        <Flex>
          <Sidebar open={sidebarOpen} screenSize={width} />
          <Main screenSize={width} />
        </Flex>
      )}
    </>
  );
}

export default Layout;
