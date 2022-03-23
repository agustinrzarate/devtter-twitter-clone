import styled from "styled-components"
import { addOpacityColor } from "./../../styles/utils"
import { colors } from "styles/theme"

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 49px;
  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 2px -2px ${addOpacityColor(colors.gray, 0.1)};
  padding: 0 15px;
  background-color: transparent;
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800px;
  }
`

export const Devits = styled.section`
  max-height: 90%;
  overflow-y: auto;
`
