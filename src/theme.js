import { createTheme } from "@mui/material/styles";
import "@fontsource-variable/montserrat";

let appTheme = createTheme({
  palette: {
    primary: {
      light: "#FF7753",
      main: "#FF5C30",
      dark: "",
      contrastText: "#fff",
    },
    background: {
      default: "#F8F8F8",
    },
    customColors: {
      grey: {
        main: "#9e9e9e",
        light: "#cfcfcf",
        dark: "#8D8D8D",
      },
      black: {
        main: "#2A2A2A",
      },
    },
  },
  typography: {
    fontFamily: "Montserrat Variable",
    color: "#212121",
    h1: {
      fontSize: "3.2rem",
      fontWeight: "600",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.3rem",
    },
    subtitle1: {
      fontSize: "1.1rem",
    },
    subtitle2: {
      fontSize: "0.8rem",
      fontWeight: "700",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "400",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8D8D8D",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#bdbdbd",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: "3rem",
          fontWeight: "600",
          padding: "0 1.5rem 0 1.5rem",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat Variable",
          fontSize: "13px",
          fontWeight: "500",
        },
      },
    },
  },
});

export default appTheme;
