import React from "react";

import { ThemeContext } from './contexts/theme/ThemeContext';
import { Home } from './pages/Home';

export default function App() {

  return (
    <ThemeContext>
      <Home />
    </ThemeContext>
  );
}
