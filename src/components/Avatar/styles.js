import styled, { css } from "styled-components"
import Image from "next/image"

export const Container = styled.div`
  display: flex;
  align-items: center;
  min-width: 49px;
  max-height: 49px;
  ${(props) =>
    props.children.length === 2 &&
    css`
      strong {
        margin-left: 8px;
        font-size: 15px;
      }
    `}
`

export const Img = styled(Image)`
  border-radius: 9999px;
`
