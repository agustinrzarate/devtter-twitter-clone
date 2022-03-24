import styled from "styled-components"
import { fonts, colors, breackpoints } from "../../styles/theme"
import { addOpacityColor } from "./../../styles/utils"

const backgroundColor = addOpacityColor(colors.primary, 0.25)

export const App = styled.div`
  font-family: ${fonts.base};
  background-image: radial-gradient(${backgroundColor} 1px, #fafafa 1px),
    radial-gradient(${backgroundColor} 1px, #fafafa 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow-y: hidden;
  display: grid;
  place-items: center;

  main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 10px 25px ${addOpacityColor(colors.secondary, 0.15)};
    box-sizing: border-box;
  }

  @media (min-width: ${breackpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breackpoints.mobile};
      border-radius: 30px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        -webkit-appearance: none;
        background: #000000;
        padding: 35px;
      }
      &::-webkit-scrollbar:vertical {
        width: 10px;
        margin-top: 35px;
      }
      &::-webkit-scrollbar-button {
        height: 20px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #d1d1d1ee;
        border-radius: 20px;
        border: 1px solid #ffffff;
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        padding: 90px;
      }
    }
  }
`
