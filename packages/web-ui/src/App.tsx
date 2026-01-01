import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';
import { styleReset } from 'react95';
import { createGlobalStyle } from 'styled-components';
import { Desktop } from './components/Desktop';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'MS Sans Serif', Arial, sans-serif;
  }
`;

function App() {
  return (
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <Desktop />
    </ThemeProvider>
  );
}

export default App;
