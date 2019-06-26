import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Flex } from "./components/Layout";
import SearchBar from "./components/SearchBar";
import { SvgInitials, SvgSignature } from "../public/icons";

/**
 * Styling
 */

const DesktopHeaderLayout = styled.div`
  background-color: #3b3f45;
  border-bottom: 1px solid #aaaaaa;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
`;

const MobileHeaderLayout = styled.div`
  background-color: #3b3f45;
  border-bottom: 1px solid #aaaaaa;
  display: grid;
  grid-template-columns: 60px auto 60px;
  height: 60px;
`;

const NavLayout = styled(Flex)`
  margin-left: 25px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bfbfbf;
`;

// const BrandLogo = styled(Link)`
//   height: 100%;
//   display: flex;
//   cursor: pointer;
//   text-decoration: none;
//   margin-left: auto;
//   margin-right: auto;
//   align-items: center;
// `;

/**
 * Components
 */

function NavItem({ to, ...rest }) {
  return (
    <StyledNavLink
      to={to}
      isActive={(match, location) => {
        if (!match) {
          return false;
        }
        // const searchParams = new URLSearchParams(location.search);
        return match.isExact; // && searchParams.has("id");
      }}
      activeStyle={{
        color: "white"
      }}
    >
      {rest.children}
    </StyledNavLink>
  );
}

function Header({ screenSize }) {
  if (screenSize == "mobile") {
    return (
      <MobileHeaderLayout>
        <Flex justifyCenter alignCenter padding={"5px"}>
          <SvgInitials height={"40px"} width={"40px"} />
        </Flex>
        <SearchBar />
        <NavItem to="/blurb">Blurb</NavItem>
      </MobileHeaderLayout>
    );
  } else {
    return (
      <DesktopHeaderLayout>
        <NavLayout justifyBetween alignCenter>
          <NavItem to="/about-me">about me</NavItem>
          <NavItem to="/technical-articles">technical articles</NavItem>
          <NavItem to="/code">code</NavItem>
          <NavItem to="/art">art</NavItem>
        </NavLayout>
        <Flex justifyCenter alignCenter padding={"5px"}>
          <SvgSignature height={"40px"} width={"80px"} />
        </Flex>
        <SearchBar />
      </DesktopHeaderLayout>
    );
  }
}

export default Header;
