import React, { Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/App.css";
import DefaultTheme from "./theme";
import GlobalStyles from "./assets/styles/GlobalStyles";
import Routes from "./Routes";
import SuspenseLoader from "./components/Loader/SuspenseLoader";

const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter basename={process.env.REACT_APP_BASENAME || "/"}>
          <GlobalStyles />
          <Routes />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
