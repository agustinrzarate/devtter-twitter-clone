import styled from "styled-components"
import { DRAG_IMAGE_STATES } from "../../pages/compose/devit"

export const TextArea = styled.textarea`
  border: ${(props) =>
    props.drag === DRAG_IMAGE_STATES.DRAG_OVER
      ? "3px dashed #09f"
      : "3px solid transparent"};
  min-height: 180px;
  outline: 0;
  resize: none;
  width: 300px;
  margin: 0 15px;
`
export const Form = styled.form``

export const Section = styled.section`
  max-width: 100%;
  box-sizing: border-box;
`

export const ButtonClose = styled.button`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 999px;
  color: #fff;
  font-size: 16px;
  width: 22px;
  height: 22px;
  top: 12px;
  left: 235px;
  position: relative;
  border: 0;
  z-index: 1;
  cursor: pointer;
`

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 25px 15px;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
