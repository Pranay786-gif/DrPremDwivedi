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
      main: "#111E30", // Midnight Ink: rich, highly sophisticated dark navy
      light: "#1F324D", // Soft Slate Navy
      dark: "#0A111D", // Deep Obsidian Ink
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#2A5C43", // Warm Australian Sage: grounded, organic, and academic
      light: "#EAF5EE", // Laurel Cream: soft, textured green wash for subtle highlights
      dark: "#1A3B2B", // Forest Shadow
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAF9F5", // Alabaster Paper: warm, high-end book-page off-white
      paper: "#FFFFFF", // Clean white for cards and structured content containers
    },
    text: {
      primary: "#182230", // Dark Slate Ink: highly readable charcoal
      secondary: "#53685D", // Muted Sage Slate for secondary metadata and captions
    },
    divider: "rgba(42, 92, 67, 0.1)", // Ultra-soft green-tinted divider for premium borders
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
      color: "#111E30",
    },
    h3: {
      fontSize: "2.1rem",
      fontWeight: 600,
      fontFamily: playfair.style.fontFamily,
      lineHeight: 1.35,
      color: "#111E30",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#111E30",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 600,
      letterSpacing: "0.03em",
    },
    body1: {
      fontSize: "1.025rem",
      lineHeight: 1.75,
      color: "#35433C", // Highly legible organic slate
    },
    body2: {
      fontSize: "0.925rem",
      lineHeight: 1.65,
      color: "#53685D",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px", // Elegantly softened curves
          padding: "12px 28px", // Generous, balanced padding
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)", // Premium smooth easing
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 10px 20px rgba(42, 92, 67, 0.12)", // Glow tinted with Sage Green
          },
        },
        contained: {
          boxShadow: "0 6px 15px rgba(17, 30, 48, 0.08)",
        },
        outlined: {
          borderWidth: "1.5px",
          borderColor: "rgba(17, 30, 48, 0.2)",
          "&:hover": {
            borderWidth: "1.5px",
            borderColor: "#111E30",
            backgroundColor: "rgba(17, 30, 48, 0.03)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px", // Smooth, highly modern curves
          boxShadow: "0 10px 35px rgba(17, 30, 48, 0.03)", // Whisper-soft shadow
          border: "1px solid rgba(42, 92, 67, 0.04)", // Very subtle organic border
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          "&:hover": {
            boxShadow: "0 20px 45px rgba(42, 92, 67, 0.08)", // Elevates into soft sage glow
            transform: "translateY(-6px)",
            borderColor: "rgba(42, 92, 67, 0.15)", // Smoothly shifts border color on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            transition: "all 0.3s ease",
            "& fieldset": {
              borderColor: "rgba(17, 30, 48, 0.12)",
            },
            "&:hover fieldset": {
              borderColor: "#2A5C43", // Glows Sage Green on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#2A5C43",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          fontSize: "0.825rem",
          letterSpacing: "0.02em",
          border: "1px solid rgba(42, 92, 67, 0.05)",
        },
      },
    },
  },
  spacing: 8,
});

export default theme;
