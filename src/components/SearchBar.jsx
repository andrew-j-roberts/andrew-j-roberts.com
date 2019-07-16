import React from "react";
import styled from "styled-components";
import { Flex } from "./layout";
import { SvgMagnifyingGlass } from "../../public/icons";

/**
 * Styling
 */

const SearchBarContainer = styled.div`
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const SearchBarLayout = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 50px auto;
`;

const MagnifyingGlassIcon = styled(SvgMagnifyingGlass)`
  cursor: pointer;
  &:hover {
    filter: brightness(150%);
  }
`;

const StyledInput = styled.input`
  background-color: #bfbfbf;
  border: none;
  font-size: 18px;
  height: 40px;
  width: 100%;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
`;

/**
 * Component
 */

function SearchBar(props) {
  return (
    <SearchBarContainer>
      <SearchBarLayout>
        <MagnifyingGlassIcon height={"35px"} />
        <Flex>
          <StyledInput />
        </Flex>
      </SearchBarLayout>
    </SearchBarContainer>
  );
}

export default SearchBar;
