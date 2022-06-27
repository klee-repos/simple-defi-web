import { createTheme } from "@mui/material/styles";

export const primary = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C7EF00",
    },
    secondary: {
      main: "#1e1b1c",
    },
  },
  typography: {
    button: {
      fontFamily: "Asap",
      fontWeight: 500,
      textTransform: "none",
      fontSize: 16,
    },
  },
});
