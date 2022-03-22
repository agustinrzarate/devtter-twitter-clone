import { ButtonStyle } from './styles';

export const Button = ({ children, onClick, buttonType='primary', fontSize}) => {
    return (
        <ButtonStyle onClick={onClick} type={buttonType} fontSize={fontSize}>
            {children}
        </ButtonStyle>
    )
};