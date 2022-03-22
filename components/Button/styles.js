import styled, {css} from 'styled-components';
import { colors, fonts } from '../../styles/theme';
import { addOpacityColor } from './../../styles/utils';

export const ButtonStyle = styled.button`
  border: 0;
  font-family: ${fonts.base};
  border-radius: 9999px;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  transition: ease all 0.3s;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.9;
  }
  
  & > svg {
    margin-right: 10px;
  }

  ${(props) =>
    props.type === 'secondary' &&
    css`
      background: ${colors.gray};
      color: ${colors.white};
      &:hover {
        box-shadow: 0 2px 10px ${addOpacityColor(colors.gray, 0.5)};
      }
    `}
`;