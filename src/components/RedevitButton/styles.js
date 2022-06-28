import styled from "styled-components"


export const Label = styled.label`
  display: flex;
  cursor: pointer;
  svg {
    fill: #73777b;
  }
  &:hover {
    box-shadow: 1px 1px 1px #f2f2f2f2;
    border-radius: 9999px;
  }
`

export const Input = styled.input`
  position: absolute;
  display: none;
  color: #fff;
  &:checked + svg {
    fill: #14c38e;
    animation: ${(props) => props.change? 'expand 0.5s' : '' } ;
  }
  @keyframes expand {
    0% {
      transform: rotate(-180deg);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
      transform: rotate(180deg);
    }
}`

export const Number = styled.div`
  font-size: 12px;
  color: #73777b;
  position: absolute;
  transition: ease 5s;
  left: 125px;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
`