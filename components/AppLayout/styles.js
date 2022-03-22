import styled from 'styled-components';
import { fonts, colors, breackpoints } from '../../styles/theme';
import { addOpacityColor } from './../../styles/utils';


const backgroundColor = addOpacityColor(colors.primary, 0.25);
const shadow = addOpacityColor(colors.secondary, 0.15);

export const App = styled.div`
  font-family: ${fonts.base};
  background-image: radial-gradient(${backgroundColor} 1px, #fafafa 1px),
    radial-gradient(${backgroundColor} 1px, #fafafa 1px);
  background-position: 0 0, 25px 25px;
  background-size: 50px 50px;
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow-y: hidden;
  display: grid;
  place-items: center;

  main {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 10px 25px ${addOpacityColor(colors.secondary, 0.15)};
    padding: 25px;
  }

  @media (min-width: ${breackpoints.mobile}) {
    main {
      height: 90vh;
      width: ${breackpoints.mobile};
    }
  }
`;