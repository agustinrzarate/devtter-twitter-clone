import { colors, fonts } from "src/styles/theme"
import styled from "styled-components"

export const Container = styled.button`
  width: 100%;
  height: 70px;
  background-color: ${colors.white};
  border: none;
  border-bottom: 1px solid #eaf7ff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  strong {
    margin-left: 15px;
    font-size: 16px;
    font-family: ${fonts.base};
  }
`
