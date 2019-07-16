import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Flex } from "./components/layout";
import SearchBar from "./components/SearchBar";
import { SvgInitials, SvgSignature, SvgMenuHamburger } from "../public/icons";

/**
 * Styling
 */

const DesktopHeaderLayout = styled.div`
  background-color: #38383d;
  border-bottom: 1px solid #aaaaaa;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
  margin-bottom: -1px; /* compensate for border bottom */
  padding-left: 20px;
  padding-right: 20px;
`;

const MobileHeaderLayout = styled.div`
  background-color: #38383d;
  border-bottom: 1px solid #aaaaaa;
  display: grid;
  grid-template-columns: 60px auto 60px;
  height: 60px;
  margin-bottom: -1px; /* compensate for border bottom */
  padding-left: 20px;
  padding-right: 20px;
`;

const MobileMenuLayout = styled(Flex)`
  height: calc(100vh - 60px);
  width: 100%;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #bfbfbf;

  &:hover {
    filter: brightness(150%);
  }
`;

const StyledButton = styled.button`
  background-color: Transparent;
  border: none;
  color: #bfbfbf;
  text-decoration: none;

  &:hover {
    filter: brightness(150%);
  }
`;

/**
 * Components
 */

function NavItem({ to, children }) {
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
      {children}
    </StyledNavLink>
  );
}

function Header({ screenSize, toggleMenu }) {
  if (screenSize == "mobile") {
    return (
      <MobileHeaderLayout>
        <Flex justifyCenter alignCenter padding={"10px"}>
          <StyledNavLink to="/">
            <SvgInitials height={"40px"} width={"40px"} />
          </StyledNavLink>
        </Flex>
        <SearchBar />
        <Flex justifyCenter alignCenter padding={"10px"}>
          <StyledButton onClick={toggleMenu}>
            <SvgMenuHamburger height={"30px"} width={"30px"} />
          </StyledButton>
        </Flex>
      </MobileHeaderLayout>
    );
  } else {
    return (
      <DesktopHeaderLayout>
        <Flex justifyBetween alignCenter>
          <NavItem to="/about-me">about me</NavItem>
          <NavItem to="/technical-articles">technical articles</NavItem>
          <NavItem to="/code">code</NavItem>
          <NavItem to="/art">art</NavItem>
        </Flex>
        <Flex justifyCenter alignCenter padding={"5px"}>
          <StyledNavLink to="/">
            <SvgSignature height={"40px"} width={"80px"} />
          </StyledNavLink>
        </Flex>
        <SearchBar />
      </DesktopHeaderLayout>
    );
  }
}

export function MobileMenu() {
  return <MobileMenuLayout>Hello!</MobileMenuLayout>;
}

export default Header;
