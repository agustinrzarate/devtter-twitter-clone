import styled from "styled-components"
import { addOpacityColor } from "./../../styles/utils"
import { colors } from "styles/theme"

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 49px;
  position: sticky;
  z-index: 1;
  top: 0;
  width: 100%;
  box-shadow: 0 4px 2px -2px ${addOpacityColor(colors.gray, 0.1)};
  padding: 0 20px;
  background-color: ${addOpacityColor(colors.white, 0.8)};
  backdrop-filter: blur(5px);
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 800px;
  }
`
