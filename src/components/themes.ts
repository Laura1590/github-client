import { createMuiTheme } from "@material-ui/core";

export const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: "\"montserrat-regular\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: '#62d0b5',
      light: '#3386FF',
    },
    secondary: {
      main: '#d07662',
    },
    text: {
      primary: '#212121',
      secondary: '#9b9b9b',
      hint: '#bebebe',
    },
  },
});