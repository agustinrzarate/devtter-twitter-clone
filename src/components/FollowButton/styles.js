import styled from "styled-components";

export const Container = styled.button`
  padding: 0;
  border: none;
  position: absolute;
  right: 20px;
  justify-self: right;
  background-color: ${(props) => {
    const color = props.text === "Following" ? "#f75a1b" : "#104068"
    return color
  }};
  border-radius: 4px;
  overflow: hidden;
  float: left;
  text-align: center;
`
export const Span = styled.div`
  text-align: center;
  padding: 3px 15px;
  display: block;
  font-size: 14px;
  width: 100px;
  transition: ease-in 0.2s;
`

export const Input = styled.input`
  position: absolute;
  display: none;
  color: #fff;

  & + div {
    color: #fff;
  }
  &:checked + div {
    width: 100px;
    padding: 3px 15px;
    background-color: ${(props) => {
      const color = props.text === "Follow" ? "#104068" : "#f75a1b"
      return color
    }};
  }
`

export const Label = styled.label`
  line-height: 1.5em;
`