import styled from "styled-components";

export const Heart = styled.div`
  cursor: pointer;
  height: 30px;
  width: 50px;
  background-image: url("https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png");
  background-position: left;
  background-repeat: no-repeat;
  background-size: 2900%;
  background-position: left;
`
export const Input = styled.input`
  position: absolute;
  display: none;
  color: #fff;

  &:checked + div {
    animation: ${(props)=> props.change? 'heart-burst 0.9s steps(28)': ''};
    background-position: right;
  }

  @keyframes heart-burst {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
`

export const Number = styled.div`
  font-size: 12px;
  color: #73777b;
  position: absolute;
  right: 85px;
`

