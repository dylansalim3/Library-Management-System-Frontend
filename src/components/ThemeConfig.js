import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
});

function OverridesCss() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Overrides CSS</Button>
    </ThemeProvider>
  );
}

export default OverridesCss;
