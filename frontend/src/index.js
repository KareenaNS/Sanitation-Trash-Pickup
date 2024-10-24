import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { AuthProvider } from './context/AuthContext'; // Ensure this path is correct
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#E8F0F2", // Softer background color for a modern look
        color: "#333333", // Darker text color for better contrast
        fontFamily: "Arial, sans-serif", // Modern sans-serif font
        fontSize: "16px", // Standard font size for readability
        lineHeight: "1.5", // Improved line height for better readability
      },
    },
  },
  colors: {
    white: "#FFFFFF", // Clean white for backgrounds and text
    gray: "#F5F5F5", // Light gray for subtle elements
    cyan: "#00BFFF", // Bright cyan for accent elements
    mauve: "#D8BFD8", // Soft mauve for subtle elements
    red: "#FF0000",
    navy: "#003366", // Deep navy for headers and strong text
    body: "#4A4A4A", // Dark gray for main body text
    body_inactive: "rgba(0, 0, 0, 0.5)", // Slightly less opaque text
    gradient: "linear-gradient(135deg, #E8F0F2 0%, #C2EDEA 100%)", // Attractive gradient background
  },
  fonts: {
    heading: "'Poppins', sans-serif", // Modern font for headings
    body: "'Roboto', sans-serif", // Clean font for body text
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold", // Bold buttons for emphasis
      },
      variants: {
        solid: {
          bg: "#00BFFF", // Bright cyan for primary buttons
          color: "white",
          _hover: {
            bg: "#008FBF", // Darker shade on hover
          },
        },
        outline: {
          borderColor: "#00BFFF",
          color: "#00BFFF",
          _hover: {
            bg: "#E0F7FF", // Light cyan on hover
          },
        },
        danger: {
          bg: "#FF0000", // Bright red
          color: "white",
          _hover: {
              bg: "#BF0000", // Darker red on hover
          },
        },
        edit: {
          bg: "#f7eb60", // yellow
          color: "white",
          _hover: {
              bg: "#ab9e09", // Darker red on hover
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: "#00BFFF",
            _hover: {
              borderColor: "#008FBF",
            },
          },
        },
      },
    },
  },
});

const root = createRoot(document.getElementById('root'));
root.render(
    <AuthProvider> {/* Wrap with AuthProvider */}
      <App />
    </AuthProvider>
);
export default customTheme;
