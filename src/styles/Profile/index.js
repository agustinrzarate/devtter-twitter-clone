import { addOpacityColor } from "src/utils"
import styled from "styled-components"
import { colors } from "../theme"

export const Box = styled.div`
  height: 190px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 100, 1) 0%,
    rgba(40, 110, 180, 1) 0%,
    rgba(225, 225, 225, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 15px 10px -15px ${addOpacityColor(colors.primary, 0.5)};
  padding-top: 30px;
`
export const AvatarContainer = styled.div`
  margin-top: 40px;
  min-height: 100px;
  width: 100px;
  border: 2px solid ${colors.white};
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DevitsContainer = styled.div`
  margin-top: 40px;
  flex: 1;
`

export const BottomHeader = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: ${colors.white};
  margin-top: 40px;
  min-height: 50px;
  position: relative;
  box-shadow: 0px 15px 15px -15px ${addOpacityColor(colors.primary, 0.5)};
  top: -10px;
  padding: 0 20px;
  span{
    font-size: 14px;
    margin-right: 20px;
  }
`