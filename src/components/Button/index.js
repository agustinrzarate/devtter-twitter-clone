import { ButtonStyle } from "./styles"

export const Button = ({
  children,
  onClick,
  buttonType = "primary",
  fontSize,
  disabled,
}) => {
  return (
    <ButtonStyle
      onClick={onClick}
      type={buttonType}
      fontSize={fontSize}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  )
}
