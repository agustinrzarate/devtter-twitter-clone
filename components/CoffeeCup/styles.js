import styled from "styled-components"
import { colors } from "styles/theme"
export const ContainerCup = styled.div`
  height: 180px;
  overflow: hidden;
  position: relative;
  width: 180px;
  background-color: ${colors.primary};
  border-radius: 9999px;
  div {
    position: absolute;
  }
`

export const SemiCircle = styled.div`
  position: relative;
  top: 70px;
  left: 11px;
  width: 50px;
  height: 25px;
  border-radius: 100px 100px 0 0;
  transform: rotate(-90deg);
  border-top: 5px solid #ffffff;
  border-left: 5px solid #ffffff;
  border-right: 5px solid #ffffff;
`

export const Cup = styled.div`
  border: 5px solid #ffffff;
  border-top: 0;
  border-radius: 0 0 30px 30px;
  height: 100px;
  left: 48px;
  bottom: 35px;
  width: 85px;
`

export const Coffee = styled.div`
  background-color: #1c0a00;
  border: 5px solid #1c0a00;
  border-radius: 0 0 25px 25px;
  bottom: 0;
  height: ${(props) => props.height};
  overflow: hidden;
  width: 74px;
  transition: ease 0.3s;
  &::after {
    background-color: rgba(255, 255, 255, 0.25);
    bottom: -10px;
    content: "";
    height: 200px;
    left: -40px;
    position: absolute;
    transform: rotate(30deg);
    -webkit-transform: rotate(15deg);
    width: 80px;
  }
`
