import styled from 'styled-components';
import { fonts, colors } from '../../styles/theme';
import { addOpacityColor } from './../../styles/utils';

const backgroundColor = addOpacityColor(colors.primary, 0.25);
export const App = styled.div`
  font-family: ${fonts.base};
  background-image: radial-gradient(${backgroundColor} 1px, transparent 1px),
    radial-gradient(${backgroundColor} 1px, transparent 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow-y: hidden;
  display: grid;
  place-items: center;
  h1 {
    margin: 0;
  }
  main {
    height: 85vh;
    background-color: #fff;
    border-radius: 30px;
    width: 450px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }
`;