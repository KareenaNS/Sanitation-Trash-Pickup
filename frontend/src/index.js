import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { AuthProvider } from './context/AuthContext'; // Ensure this path is correct
import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#F5F5F5",
        color: "rgba(0, 0, 0, 0.9)",
        fontFamily: "forum, serif",
        fontSize: "10px",
        fontWeight: "100",
      },
    },
  },
  colors: {
    white: "#F5F5F5",
    white_inactive: "rgba(250, 250, 250, 0.7)",
    gray: "#F0F0F0",
    cyan: "#C2EDEA",
    mauve: "#DED3DE",
    navy: "#454447",
    body: "rgba(0, 0, 0, 0.9)",
    body_inactive: "rgba(0, 0, 0, 0.4)",
    gradient: "linear-gradient(0deg, #F5F5F5 0%, #DED3DE 90%)", // "linear-gradient(45deg, #C2EDEA 0%, #DED3DE 95%)"
  },
});

const root = createRoot(document.getElementById('root'));
//root.render(<App />);
root.render(
    <AuthProvider> {/* Wrap with AuthProvider */}
      <App />
    </AuthProvider>
);
export default customTheme;