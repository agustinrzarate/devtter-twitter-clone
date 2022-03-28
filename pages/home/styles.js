import styled from "styled-components"
import { addOpacityColor } from "./../../styles/utils"
import { colors } from "styles/theme"

export const Header = styled.header`
  display: flex;
  align-items: center;
  min-height: 49px;
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 2px -2px ${addOpacityColor(colors.gray, 0.1)};
  padding: 0 15px;
  background-color: ${addOpacityColor(colors.white, 0.7)};
  backdrop-filter: blur(5px);
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800px;
  }
`

export const Devits = styled.section`
  flex: 1;
`

export const Footer = styled.nav`
  height: 49px;
  background: #fff;
  position: sticky;
  bottom: 0;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  box-shadow: 1px 5px 6px 4px ${addOpacityColor(colors.gray, 0.1)};

  & a {
    height: 32px;
    padding: 8px;
    box-sizing: content-box;
    transition: 0.3s ease;
    width: 80px;
    text-align: center;
  }
  & a:hover {
    background: radial-gradient(#0099ff22 11%, transparent 16%);
    background-size: 180px 180px;
    background-position: center;
  }
`
