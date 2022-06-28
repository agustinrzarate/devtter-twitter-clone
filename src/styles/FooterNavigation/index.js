import { addOpacityColor } from "../../utils"
import { colors } from "src/styles/theme"
import styled from "styled-components"

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