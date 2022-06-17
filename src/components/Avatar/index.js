import { Container, Img } from "./styles"

export default function Avatar({ alt, src, height = 48, width = 48, text }) {
  return (
    <Container>
      <Img src={src} alt={alt} width={width} height={height} />
      {text && <strong>{text}</strong>}
    </Container>
  )
}
