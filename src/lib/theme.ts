import { createTheme } from "@mui/material/styles";
import { Poppins, Playfair_Display } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1a1a2e",
      light: "#16213e",
      dark: "#0f3460",
      contrastText: "#fff",
    },
    secondary: {
      main: "#8EE53F",
      light: "#D7F6BB",
      dark: "#40661C",
      contrastText: "#fff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a2e",
      secondary: "#555",
    },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      fontFamily: playfair.style.fontFamily,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.8rem",
      fontWeight: 700,
      fontFamily: playfair.style.fontFamily,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      fontFamily: playfair.style.fontFamily,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      color: "#555",
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.6,
      color: "#777",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px rgba(184, 230, 150, 0.15)",
          },
        },
        contained: {
          boxShadow: "0 4px 12px rgba(212, 249, 156, 0.3)",
        },
        outlined: {
          borderWidth: "2px",
          "&:hover": {
            borderWidth: "2px",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "#e0e0e0",
            },
            "&:hover fieldset": {
              borderColor: "#8EE53F",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#8EE53F",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
